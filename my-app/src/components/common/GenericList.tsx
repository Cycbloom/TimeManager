import { List, Typography, Divider } from "@mui/material";
import React, { ReactNode } from "react";

interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  header?: ReactNode;
  showDividers?: boolean;
}

function GenericList<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = "没有可用项目",
  header,
  showDividers = true,
}: GenericListProps<T>) {
  if (items.length === 0) {
    return (
      <>
        {header}
        <Typography>{emptyMessage}</Typography>
      </>
    );
  }

  return (
    <>
      {header}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {items.map((item, index) => (
          <React.Fragment key={keyExtractor(item)}>
            {renderItem(item, index)}
            {showDividers && index < items.length - 1 && (
              <Divider component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </>
  );
}

export default GenericList;
