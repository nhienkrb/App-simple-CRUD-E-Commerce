import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function RichTextEditor({ value, onChange }) {
  const handleEditorChange = (content, editor) => {
    onChange && onChange(content);
  };

  return (
    <Editor
      apiKey="bdgtdm3ynsonksj498b1mo2xoh2e9n6b6wa45ajpsyfkvpb4" // Bạn có thể dùng free không cần key
      value={value}
      onEditorChange={handleEditorChange}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}
