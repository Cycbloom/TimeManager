import { Box, Typography, Chip } from "@mui/material";
import { Note } from "@/types/notes";

interface NoteContentProps {
  note: Note;
}

const NoteContent = ({ note }: NoteContentProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle1" component="div">
        {note.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" component="div">
        {note.content}
      </Typography>
      {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          创建时间:{" "}
          {note.created_at
            ? format(new Date(note.created_at), "yyyy-MM-dd HH:mm")
            : "未知"}
        </Typography>
        {note.updated_at && (
          <Typography variant="caption" color="text.secondary">
            更新时间: {format(new Date(note.updated_at), "yyyy-MM-dd HH:mm")}
          </Typography>
        )}
      </Box> */}
      {note.tags && note.tags.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
          {note.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default NoteContent;
