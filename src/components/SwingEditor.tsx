import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, {useEffect, useState} from "react";

const SwingEditor = (props: { form: any, fieldName: string, callback?: React.FC }) => {
    const [data, setData] = useState<string>('');
    useEffect(() => {
        setData(props.form.getFieldValue(props.fieldName));
    }, [props])
    return (
        <CKEditor
            editor={ClassicEditor}
            data={data}
            onChange={(event: any, editor: any) => {
                const data = editor.getData();
                props.form.setFieldsValue({[props.fieldName]: data})
                // props.callback(data)
            }}
            onReady={(editor: any) => {
                console.log("Editor", editor)
                editor.editing.view.change((writer: any) => {
                    writer.setStyle(
                        "height",
                        "300px",
                        editor.editing.view.document.getRoot()
                    );
                });
            }}
        />
    )
}
export default SwingEditor;
