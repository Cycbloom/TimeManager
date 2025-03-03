useData 优化

1. 缓存策略：
   <TYPESCRIPT>
   // 在 useData 中添加缓存逻辑
   const cachedData = localStorage.getItem('notebooks');
   const initialData = cachedData ? JSON.parse(cachedData) : [];

// 在获取数据成功后
localStorage.setItem('notebooks', JSON.stringify(data));
防抖请求：
<TYPESCRIPT>
// 在 useData 中添加防抖逻辑
let timeoutId: number;
const debouncedFetch = () => {
clearTimeout(timeoutId);
timeoutId = window.setTimeout(fetchData, 300);
};

useEffect(() => {
debouncedFetch();
return () => clearTimeout(timeoutId);
}, deps);
类型扩展：
<TYPESCRIPT>
// 支持更多笔记本属性
export interface Notebook {
id: number;
name: string;
color?: string;
cover?: string;
isPinned?: boolean;
noteCount?: number; // 可以从后端聚合返回
}
