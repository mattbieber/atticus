import { Heading } from '@tiptap/extension-heading'
import { StarterKit } from '@tiptap/starter-kit'
import { mergeAttributes } from '@tiptap/core'

export const editorConfig = [
    StarterKit.configure({
        heading: false,
    }),
    Heading.configure()
        .extend({
            levels: [1, 2, 3],
            renderHTML({ node, HTMLAttributes }) {
                const level = this.options.levels.includes(node.attrs.level)
                    ? node.attrs.level
                    : this.options.levels[0]
                const classes: { [index: number]: string } = {
                    1: 'font-bold',
                    2: 'text-xl',
                    3: '',
                }

                return [
                    `h${level}`,
                    mergeAttributes(
                        this.options.HTMLAttributes,
                        HTMLAttributes,
                        {
                            class: `${classes[level]}`,
                        },
                    ),
                    0,
                ]
            },
        })
        .configure({ levels: [1, 2, 3] }),
    
]
