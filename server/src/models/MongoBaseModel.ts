import mongoose from "mongoose";
import {
  QueryParams,
  CreateData,
  UpdateData,
  RemoveBrand,
} from "../types/model";

class MongoBaseModel<T> {
  protected model: mongoose.Model<RemoveBrand<T>>;
  protected hasCreatedAt: T extends { created_at: Date } ? true : false;
  protected hasUpdatedAt: T extends { updated_at: Date } ? true : false;

  constructor(model: mongoose.Model<RemoveBrand<T>>) {
    this.model = model;
  }

  // 转换_id为id的辅助函数
  protected transformId(doc: any) {
    if (!doc) return null;
    const transformed = doc.toJSON();
    transformed.id = transformed._id.toString();
    delete transformed._id;
    return transformed;
  }

  protected processRow(row: any) {
    const processedRow = { ...row };
    if ("__v" in processedRow) {
      delete processedRow.__v;
    }
    return processedRow;
  }

  async create(data: CreateData<T>) {
    const now = new Date();
    const newDoc = new this.model({
      ...data,
      ...(this.hasCreatedAt && { created_at: now }),
      ...(this.hasUpdatedAt && { updated_at: now }),
    });
    const result = await newDoc.save();
    return this.processRow(this.transformId(result));
  }

  async findById(id: string) {
    const doc = await this.model.findById(id).exec();
    return this.processRow(this.transformId(doc));
  }

  async find(query: QueryParams = {}) {
    const { orderBy, page, limit, ...otherQuery } = query;
    // 处理查询条件中的id转换为_id
    const processedQuery = { ...otherQuery };
    if ("id" in processedQuery) {
      processedQuery._id = processedQuery.id;
      delete processedQuery.id;
    }
    let mongoQuery = this.model.find(
      processedQuery as mongoose.FilterQuery<RemoveBrand<T>>
    );

    // 处理排序
    if (orderBy) {
      const [field, direction] = orderBy.split(":");
      mongoQuery = mongoQuery.sort({
        [field]: direction?.toLowerCase() === "desc" ? -1 : 1,
      });
    } else if (this.hasCreatedAt) {
      mongoQuery = mongoQuery.sort({ created_at: -1 });
    }

    // 处理分页
    if (page && limit) {
      const skip = (page - 1) * limit;
      mongoQuery = mongoQuery.skip(skip).limit(limit);
    }

    const docs = await mongoQuery.exec();
    return docs.map((doc) => this.processRow(this.transformId(doc)));
  }

  async update(id: string, data: UpdateData<T>) {
    const now = new Date();
    const updateData = {
      ...data,
      ...(this.hasUpdatedAt && { updated_at: now }),
    };

    const doc = await this.model.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );
    return this.processRow(this.transformId(doc));
  }

  async delete(id: string) {
    return await this.model.deleteOne({ _id: id });
  }
}

export default MongoBaseModel;
