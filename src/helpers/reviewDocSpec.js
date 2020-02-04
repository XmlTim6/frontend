const Xonomy = window.Xonomy

export const reviewDocSpec = {
    elements: {
        'review_form': {
            menu: [
                {
                    caption: "Add <overview>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<overview></overview>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("overview");
                    }
                },
                {
                    caption: "Add <positive_side>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<positive_side></positive_side>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("positive_side");
                    }
                },
                {
                    caption: "Add <major_remarks>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<major_remarks></major_remarks>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("major_remarks");
                    }
                },
                {
                    caption: "Add <minor_remarks>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<minor_remarks></minor_remarks>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("minor_remarks");
                    }
                },
            ]
        },
        'overview': {
            mustBeBefore: ['positive_side'],
            mustBeAfter: ['review_form'],
            hasText: true,
            asker: Xonomy.askString,
        },
        'positive_side': {
            mustBeBefore: ['major_remarks'],
            mustBeAfter: ['overview'],
            hasText: true,
            asker: Xonomy.askString,
        },
        'major_remarks': {
            mustBeBefore: ['minor_remarks'],
            mustBeAfter: ['positive_side'],
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
        'minor_remarks': {
            mustBeAfter: ['major_remarks'],
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