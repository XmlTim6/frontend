const Xonomy = window.Xonomy

export const paperDocSpec = {
    elements: {
        'paper': {
            menu: [
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
            ]
        },
        'author': {
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
                    action: Xonomy.deleteElement,
                    hideIf: function (jsElement) {
                        return jsElement.parent().getChildElements("author").length === 1;
                    }
                }
            ],
            attributes: {
                "email": {
                    asker: Xonomy.askString,
                }
            }
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
            ]
        },
        'institution': {
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
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
                }
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
                {
                    caption: "Add <keyword>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<keyword></keyword>'
                },
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
                    actionParameter: '<section id="" title="" level="" ></section>',
                },
                {
                    caption: "Add <quote>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<quote id="" attributed_to="" source="" reference_to=""></quote>',
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
                    actionParameter: '<mention id=""><authors></authors><work><year_published></year_published><title></title><edition></edition><city></city><publisher></publisher><numbers></numbers></work></mention>',
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
                    actionParameter: '<mention id=""><authors></authors><work><year_published></year_published><title></title><edition></edition><city></city><publisher></publisher><numbers></numbers></work></mention>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        },
        'quote': {
            hasText: true,
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'id': {
                    asker: Xonomy.askString,
                },
                'attributed_to': {
                    asker: Xonomy.askString
                },
                'source': {
                    asker: Xonomy.askString
                },
                'reference_to': {
                    asker: Xonomy.askString
                },
            }
        },
        'section': {
            menu: [
                {
                    caption: "Add <paragraph>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<paragraph id=""></paragraph>',
                },
                {
                    caption: "Add <image>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<image id="" src=""></image>',
                },
                {
                    caption: "Add <list>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<list id="" type="unordered"></list>',
                },
                {
                    caption: "Add <quote>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<quote id="" attributed_to="" source="" reference_to=""></quote>',
                },
                {
                    caption: "Add <section>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<section id="" title="" level="" ></section>',
                },
                {
                    caption: "Add <code>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<code id=""></code>',
                },
                {
                    caption: "Add <formula>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<formula id=""></formula>',
                },
                {
                    caption: "Add <table>",
                    action: Xonomy.newElementChild,
                    actionParameter: '<table id=""></table>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'id': {
                    asker: Xonomy.askString,
                },
                'title': {
                    asker: Xonomy.askString,
                },
                'level': {
                    asker: Xonomy.askString,
                }
            }
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
            attributes: {
                'id': {
                    asker: Xonomy.askString,
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
                },
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
            }
        },
        'code': {
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'id': {
                    asker: Xonomy.askString,
                },
            }
        },
        'formula': {
            menu: [
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ],
            attributes: {
                'id': {
                    asker: Xonomy.askString,
                },
            }
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
                'id': {
                    asker: Xonomy.askString,
                },
                'type': {
                    asker: Xonomy.askPicklist,
                    askerParameter: [
                        'ordered', 'unordered'
                    ],
                },
            }
        },
        'table': {
            menu: [
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
        'cell': {
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
                    actionParameter: '<paragraph id=""></paragraph>',
                },
                {
                    caption: "Delete element",
                    action: Xonomy.deleteElement
                }
            ]
        }
    }
}