const Xonomy = window.Xonomy

const rdfMenu = [
    {
        caption: "Add rdf attribute @property",
        action: Xonomy.newAttribute,
        actionParameter: { name: "property", value: 'pred:' },
        hideIf: function (jsElement) {
            return jsElement.hasAttribute("property");
        }
    },
    {
        caption: "Add rdf attribute @content",
        action: Xonomy.newAttribute,
        actionParameter: { name: "content", value: '' },
        hideIf: function (jsElement) {
            return jsElement.hasAttribute("content");
        }
    },
]

const rdfAttr = {
    'property': {
        asker: Xonomy.askString,
        menu: [{
            caption: "Delete this @property",
            action: Xonomy.deleteAttribute
        }]
    },
    'content': {
        asker: Xonomy.askString,
        menu: [{
            caption: "Delete this @content",
            action: Xonomy.deleteAttribute
        }]
    }
}

export const paperDocSpec = {
    elements: {
        'paper': {
            menu: [
                ...rdfMenu,
                {
                    caption: "Add <authors>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<authors><author email=""><personal><first_name></first_name><middle_name></middle_name><last_name></last_name></personal></author></authors>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("authors");
                    }
                },
                {
                    caption: "Add <abstract>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<abstract paper_type="conceptual"><purpose></purpose><methodology></methodology><findings></findings><research_implications></research_implications><practical_implications></practical_implications><orginality></orginality><keywords><keyword></keyword></keywords></abstract>',
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
                },
                ...rdfAttr
            }
        },
        'authors': {
            mustBeAfter: ['paper'],
            mustBeBefore: ['abstract'],
            menu: [
                ...rdfMenu,
                {
                    caption: "Add <author>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<author email=""><personal><first_name></first_name><middle_name></middle_name><last_name></last_name></personal></author>',
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
            ],
            attributes: {
                ...rdfAttr
            }
        },
        'author': {
            menu: [
                ...rdfMenu,
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
                    action: Xonomy.deleteElement,
                    hideIf: function (jsElement) {
                        return jsElement.parent().getChildElements("author").length === 1;
                    }
                }
            ],
            attributes: {
                "email": {
                    asker: Xonomy.askString,
                },
                ...rdfAttr
            }
        },
        'personal': {
            menu: [
                ...rdfMenu,
                {
                    caption: "Add <middle_name>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<middle_name></middle_name>',
                    hideIf: function (jsElement) {
                        return jsElement.hasChildElement("middle_name");
                    }
                },
            ],
            attributes: {
                ...rdfAttr
            }
        },
        'institution': {
            menu: [
                ...rdfMenu,
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                ...rdfAttr
            }
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
                ...rdfMenu,
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
                },
                ...rdfAttr
            }
        },
        'purpose': {
            hasText: true,
            asker: Xonomy.askString,
        },
        'methodology': {
            hasText: true,
            asker: Xonomy.askString,
        },
        'findings': {
            hasText: true,
            asker: Xonomy.askString,
        },
        'research_implications': {
            hasText: true,
            asker: Xonomy.askString,
        },
        'practical_implications': {
            hasText: true,
            asker: Xonomy.askString,
        },
        'orginality': {
            hasText: true,
            asker: Xonomy.askString,
        },
        'keywords': {
            menu: [
                ...rdfMenu,
                {
                    caption: "Add <keyword>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<keyword></keyword>'
                },
            ],
            attributes: {
                ...rdfAttr
            }
        },
        'keyword': {
            oneliner: true,
            hasText: true,
            asker: Xonomy.askString,
            menu: [
                ...rdfMenu
            ],
            attributes: {
                ...rdfAttr
            }
        },
        'content': {
            mustBeAfter: ['abstract'],
            mustBeBefore: ['references', 'citations'],
            menu: [
                ...rdfMenu,
                {
                    caption: "Add <section>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<section title="" level="" ></section>',
                },
                {
                    caption: "Add <quote>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<quote attributed_to="" source="" reference_to=""></quote>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                ...rdfAttr
            }
        },
        'references': {
            mustBeAfter: ['content'],
            menu: [
                ...rdfMenu,
                {
                    caption: "Add <mention>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<mention><authors></authors><work><year_published></year_published><title></title><edition></edition><city></city><publisher></publisher><numbers></numbers></work></mention>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                ...rdfAttr
            }
        },
        'mention': {
            mustBeAfter: ['content'],
            menu: [
                ...rdfMenu,
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
                'location': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @location",
                        action: Xonomy.deleteAttribute
                    }]
                },
                ...rdfAttr
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
                ...rdfMenu,
                {
                    caption: "Add <mention>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<mention><authors></authors><work><year_published></year_published><title></title><edition></edition><city></city><publisher></publisher><numbers></numbers></work></mention>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                ...rdfAttr
            }
        },
        'quote': {
            hasText: true,
            menu: [
                ...rdfMenu,
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'attributed_to': {
                    asker: Xonomy.askString
                },
                'source': {
                    asker: Xonomy.askString
                },
                'reference_to': {
                    asker: Xonomy.askString
                },
                ...rdfAttr
            }
        },
        'section': {
            menu: [
                ...rdfMenu,
                {
                    caption: "Add <paragraph>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<paragraph></paragraph>',
                },
                {
                    caption: "Add <image>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<image src=""></image>',
                },
                {
                    caption: "Add <list>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<list type="unordered"></list>',
                },
                {
                    caption: "Add <quote>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<quote attributed_to="" source="" reference_to=""></quote>',
                },
                {
                    caption: "Add <section>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<section title="" level="" ></section>',
                },
                {
                    caption: "Add <code>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<code></code>',
                },
                {
                    caption: "Add <formula>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<formula></formula>',
                },
                {
                    caption: "Add <table>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<table></table>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'title': {
                    asker: Xonomy.askString,
                },
                'level': {
                    asker: Xonomy.askString,
                },
                ...rdfAttr
            }
        },
        'paragraph': {
            hasText: true,
            menu: [
                ...rdfMenu,
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
            attributes: {
                ...rdfAttr
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
                ...rdfMenu,
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
                'src': {
                    asker: Xonomy.askString
                },
                'title': {
                    asker: Xonomy.askString,
                    menu: [{
                        caption: "Delete this @title",
                        action: Xonomy.deleteAttribute
                    }]
                },
                ...rdfAttr
            }
        },
        'code': {
            menu: [
                ...rdfMenu,
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {               
                ...rdfAttr
            }
        },
        'formula': {
            menu: [
                ...rdfMenu,
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                ...rdfAttr
            }
        },
        'list': {
            menu: [
                ...rdfMenu,
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
                ...rdfAttr
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
        'table': {
            menu: [
                ...rdfMenu,
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
                ...rdfAttr
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
        'cell': {
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