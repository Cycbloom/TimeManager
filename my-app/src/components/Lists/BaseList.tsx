import { List, Typography, Divider, Box } from "@mui/material";
import React, { ReactNode } from "react";

interface BaseListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  filterComponent?: ReactNode;
  showDividers?: boolean;
}

function BaseList<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = "没有可用项目",
  filterComponent,
  showDividers = true,
}: BaseListProps<T>) {
  return (
    <>
      {filterComponent && <Box sx={{ mb: 2 }}>{filterComponent}</Box>}
      {items.length === 0 ? (
        <Typography>{emptyMessage}</Typography>
      ) : (
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
      )}
    </>
  );
}

export default BaseList;
