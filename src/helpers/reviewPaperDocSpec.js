const Xonomy = window.Xonomy

export const reviewPaperDocSpec = {
    elements: {
        'paper': {
            menu: [
                {
                    caption: "Add <notes>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<notes></notes>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("notes");
                    }
                },
            ]
        },
        'notes': {
            menu: [
                {
                    caption: 'Add <note>',
                    action: Xonomy.newElementChild,
                    actionParameter: '<note id_ref=""></note>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        },
        'note': {
            hasText: true,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'id_ref': {
                    asker: Xonomy.askString
                }
            }
        }
    }
}

