import React, { useEffect } from 'react';

const XmlEdit = (props) => {
    const { xml, setError, docSpec } = props
    
    useEffect(() => {
        var editor = document.getElementById("editor");
        try {
            window.Xonomy.render(xml, editor, docSpec);
        } catch (error) {
            window.Xonomy.render('<paper></paper>', editor, docSpec);
            setError();
        }
    }, [xml, setError, docSpec])

    return (
        <div style={{ border: '1px solid black', padding: '8px' }}>
            <div id="editor" >

            </div >
        </div >
    )
}

export default XmlEdit;