const Xonomy = window.Xonomy

export const paperDocSpec = {
    elements: {
        'paper': {
            menu: [
                {
                    caption: "Add attribute @title",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "title", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("title");
                    }
                },
                {
                    caption: "Add <authors>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<authors></authors>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("authors");
                    }
                },
                {
                    caption: "Add <abstract>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<abstract></abstract>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("abstract");
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
                    caption: "Add <references>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<references></references>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("references");
                    }
                },
                {
                    caption: "Add <citations>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<citations></citations>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("citations");
                    }
                }

            ],
            attributes: {
                "title": {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @title",
                        action: Xonomy.deleteAttribute
                    }]
                }
            }
        },
        'authors': {
            mustBeAfter: ['paper'],
            mustBeBefore: ['abstract'],
            menu: [
                {
                    caption: "Add <author>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<author><personal><first_name></first_name><middle_name></middle_name><last_name></last_name></personal><institution><name></name><city></city><country></country></institution></author>',
                    hideIf: function (jsElement) {
                        return jsElement.parent().name === 'mention';
                    }
                },
                {
                    caption: "Add <author>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<author><last_name></last_name><initial></initial></author>',
                    hideIf: function (jsElement) {
                        return jsElement.parent().name === 'paper';
                    }
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        },
        'author': {
            menu: [{
                caption: "Add attribute @email",
                action: Xonomy.newAttribute,
                actionParameter: { name: "email", value: '' },
                hideIf: function (jsElement) {
                    return jsElement.hasAttribute("email");
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
                    menu: [{
                        caption: "Delete this @email",
                        action: Xonomy.deleteAttribute
                    }]
                }
            }
        },
        'first_name': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'middle_name': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'last_name': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'initial': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'name': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'city': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'country': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'abstract': {
            mustBeAfter: ['authors'],
            mustBeBefore: ['content'],
            menu: [
                {
                    caption: "Add attribute @paper_type",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "paper_type", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("paper_type");
                    }
                },
                {
                    caption: "Add <purpose>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<purpose></purpose>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("purpose");
                    }
                },
                {
                    caption: "Add <methodology>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<methodology></methodology>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("methodology");
                    }
                },
                {
                    caption: "Add <findings>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<findings></findings>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("findings");
                    }
                },
                {
                    caption: "Add <research_implications>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<research_implications></research_implications>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("research_implications");
                    }
                },
                {
                    caption: "Add <practical_implcations>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<practical_implcations></practical_implcations>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("practical_implcations");
                    }
                },
                {
                    caption: "Add <orginality>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<orginality></orginality>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("orginality");
                    }
                },
                {
                    caption: "Add <keywords>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<keywords></keywords>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("keywords");
                    }
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'paper_type': {
                    asker: Xonomy.askPicklist,
                    askerParameter: [
                        'conceptual', 'empirical'
                    ],
                    menu: [{
                        caption: "Delete this @paper_type",
                        action: Xonomy.deleteAttribute
                    }]
                }
            }
        },
        'purpose': {
            mustBeBefore: ['methodology'],
            hasText: true,
            asker: Xonomy.askString,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
        },
        'methodology': {
            mustBeBefore: ['findings'],
            hasText: true,
            asker: Xonomy.askString,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
        },
        'findings': {
            mustBeBefore: ['research_implications'],
            hasText: true,
            asker: Xonomy.askString,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
        },
        'research_implications': {
            mustBeBefore: ['practical_implcations'],
            hasText: true,
            asker: Xonomy.askString,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
        },
        'practical_implcations': {
            mustBeBefore: ['orginality'],
            hasText: true,
            asker: Xonomy.askString,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
        },
        'orginality': {
            mustBeBefore: ['keywords'],
            hasText: true,
            asker: Xonomy.askString,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
        },
        'keywords': {
            menu: [
                {
                    caption: "Add <keyword>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<keyword></keyword>'
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        },
        'keyword': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'content': {
            mustBeAfter: ['abstract'],
            mustBeBefore: ['references', 'citations'],
            menu: [
                {
                    caption: "Add <section>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<section></section>',
                },
                {
                    caption: "Add <quote>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<quote></quote>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        },
        'references': {
            mustBeAfter: ['content'],
            menu: [
                {
                    caption: "Add <mention>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<mention><authors></authors><work><year_published></year_published><title></title><edition></edition><city></city><publisher></publisher><numbers></numbers></work></mention>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        },
        'mention': {
            mustBeAfter: ['content'],
            menu: [
                {
                    caption: "Add attribute @id",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "id", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("id");
                    }
                },
                {
                    caption: "Add attribute @location",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "location", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("location") || jsElement.parent().name === 'references';
                    }
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'id': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @id",
                        action: Xonomy.deleteAttribute
                    }]
                },
                'location': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @location",
                        action: Xonomy.deleteAttribute
                    }]
                }
            }
        },
        'year_published': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'title': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'editor': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'published': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'numbers': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
        },
        'citations': {
            menu: [
                {
                    caption: "Add <mention>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<mention><authors></authors><work><year_published></year_published><title></title><edition></edition><city></city><publisher></publisher><numbers></numbers></work></mention>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        },
        'quote': {
            menu: [
                {
                    caption: "Add attribute @id",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "id", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("id");
                    }
                },
                {
                    caption: "Add attribute @attributed_to",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "attributed_to", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("attributed_to");
                    }
                },
                {
                    caption: "Add attribute @source",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "source", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("source");
                    }
                },
                {
                    caption: "Add attribute @reference_to",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "reference_to", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("reference_to");
                    }
                },
            ],
            attributes: {
                'id': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @id",
                        action: Xonomy.deleteAttribute
                    }]
                },
                'attributed_to': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @attributed_to",
                        action: Xonomy.deleteAttribute
                    }]
                },
                'source': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @source",
                        action: Xonomy.deleteAttribute
                    }]
                },
                'reference_to': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @reference_to",
                        action: Xonomy.deleteAttribute
                    }]
                },
            }
        },
        'section': {
            menu: [
                {
                    caption: "Add <paragraph>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<paragraph></paragraph>',
                },
                {
                    caption: "Add <image>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<image></image>',
                },
                {
                    caption: "Add <list>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<list></list>',
                },
                {
                    caption: "Add <quote>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<quote></quote>',
                },
                {
                    caption: "Add <section>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<section></section>',
                },
                {
                    caption: "Add <code>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<code></code>',
                },
                {
                    caption: "Add <table>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<table></table>',
                },
                {
                    caption: "Add attribute @id",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "id", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("id");
                    }
                },
                {
                    caption: "Add attribute @title",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "title", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("title");
                    }
                },
                {
                    caption: "Add attribute @level",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "level", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("level");
                    }
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
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
                    caption: "Add attribute @id",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "id", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("id");
                    }
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'id': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @id",
                        action: Xonomy.deleteAttribute
                    }]
                },
            }
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
        'image': {
            menu: [
                {
                    caption: "Add attribute @id",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "id", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("id");
                    }
                },
                {
                    caption: "Add attribute @src",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "src", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("src");
                    }
                },
                {
                    caption: "Add attribute @title",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "title", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("title");
                    }
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'id': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @id",
                        action: Xonomy.deleteAttribute
                    }]
                },
                'src': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @src",
                        action: Xonomy.deleteAttribute
                    }]
                },
                'title': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @title",
                        action: Xonomy.deleteAttribute
                    }]
                },
            }
        },
        'code': {
            menu: [
                {
                    caption: "Add attribute @id",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "id", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("id");
                    }
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'id': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @id",
                        action: Xonomy.deleteAttribute
                    }]
                },
            }
        },
        'formula': {
            menu: [
                {
                    caption: "Add attribute @id",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "id", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("id");
                    }
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'id': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @id",
                        action: Xonomy.deleteAttribute
                    }]
                },
            }
        },
        'list': {
            menu: [
                {
                    caption: "Add attribute @id",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "id", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("id");
                    },
                },
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
                'id': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @id",
                        action: Xonomy.deleteAttribute
                    }]
                },
                'type': {
                    asker: Xonomy.askPicklist,
                    askerParameter: [
                        'ordered', 'unordered'
                    ],
                    menu: [{
                        caption: "Delete this @id",
                        action: Xonomy.deleteAttribute
                    }]
                },
            }
        },
        'table': {
            menu: [
                {
                    caption: "Add attribute @id",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "id", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("id");
                    },
                },
                {
                    caption: "Add <row>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<row></row>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'id': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @id",
                        action: Xonomy.deleteAttribute
                    }]
                },
            }
        },
        'row': {
            menu: [                
                {
                    caption: "Add <cell>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<cell></cell>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        },
        'cell' : {
            hasText: true,
            menu: [
                {
                    caption: "Add attribute @colspan",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "colspan", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("colspan");
                    },
                },
                {
                    caption: "Add attribute @rowspan",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "rowspan", value: '' },
                    hideIf: function (jsElement) {
                        return jsElement.hasAttribute("rowspan");
                    },
                },
                {
                    caption: "Add <paragraph>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<paragraph></paragraph>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        }
    }
}