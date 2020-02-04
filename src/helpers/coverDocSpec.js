const Xonomy = window.Xonomy

export const coverDocSpec = {
    elements: {
        'cover_letter': {
            menu: [
                {
                    caption: "Add <title>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<title></title>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("title");
                    }
                },
                {
                    caption: "Add <submission_date>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<submission_date></submission_date>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("submission_date");
                    }
                },
                {
                    caption: "Add <content>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<content></content>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("content");
                    }
                },
                {
                    caption: "Add <author>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<author email=""><personal><first_name></first_name><last_name></last_name></personal></author>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("author");
                    }
                },
            ]
        },
        'title': {
            mustBeBefore: ['submission_date'],
            mustBeAfter: ['cover_letter'],
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'submission_date': {
            mustBeBefore: ['content'],
            mustBeAfter: ['title'],
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'first_name': {
            mustBeBefore: ['middle_name'],
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'middle_name': {
            mustBeBefore: ['last_name'],
            mustBeAfter: ['first_name'],
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        },
        'last_name': {
            mustBeAfter: ['middle_name'],
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'personal': {
            menu: [
                {
                    caption: "Add <middle_name>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<middle_name></middle_name>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("middle_name");
                    }
                },
            ],
        },
        'author': {
            mustBeAfter: ['content'],
            menu: [
                {
                    caption: "Add <institution>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<institution><name></name><city></city><country></country></institution>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("institution");
                    }
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                "email": {
                    asker: Xonomy.askString,
                },
            }
        },
        'institution': {
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
        },
        'content': {
            mustBeBefore: ['author'],
            mustBeAfter: ['submission_date'],
            menu: [
                {
                    caption: "Add <paragraph>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<paragraph></paragraph>',
                },
                {
                    caption: "Add <list>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<list type="unordered"></list>',
                },
            ]
        },
        'paragraph': {
            hasText: true,
            menu: [
                {
                    caption: "Add <bold>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<bold></bold>',
                },
                {
                    caption: "Add <italic>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<italic></italic>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
        },
        'bold': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
        },
        'italic': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
        },
        'list': {
            menu: [
                {
                    caption: "Add <list_item>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<list_item></list_item>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'type': {
                    asker: Xonomy.askPicklist,
                    askerParameter: [
                        'ordered', 'unordered'
                    ],
                },
            }
        },
        'list_item': {
            oneliner: true,
            hasText: true,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        },
    }
}