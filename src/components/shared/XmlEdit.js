import React, { useEffect } from 'react';

const XmlEdit = (props) => {
    const { xml } = props
    const { setError } = props
    
    useEffect(() => {
        var editor = document.getElementById("editor");
        const docSpec = {
            elements: {
                "xml": {
                    menu: [{
                        caption: "Raw edit",
                        action: window.Xonomy.editRaw,
                        actionParameter: {
                            fromJs: function (jsElement) {
                                return jsElement.getText();
                            },
                            toJs: function (txt, origElement) {
                                origElement.addText(txt);
                                return origElement;
                            }
                        },
                        hideIf: function (jsElement) {
                            return jsElement.getText() !== '';
                        }
                    }],

                }
            }
        }
        try {
            window.Xonomy.render(xml, editor, docSpec);
        } catch (error) {
            window.Xonomy.render('<paper></paper>', editor, docSpec);
            setError();
        }
    }, [xml, setError])

    return (
        <div style={{ border: '1px solid black', padding: '8px' }}>
            <div id="editor" >

            </div >
        </div >
    )
}

export default XmlEdit;