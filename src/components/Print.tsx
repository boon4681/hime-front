import Typed from 'typed.js';
import { Component, ReactNode } from "react";

export default class Print extends Component<{ viewport?: boolean, multiline?: boolean, limit?: number }, { box: any, onview: boolean }> {
    private ref?: HTMLDivElement
    private printer: any
    private observer?: IntersectionObserver
    private text: string = ''
    assign_ref = (ref: HTMLDivElement) => this.ref = ref

    constructor(props: any) {
        super(props)
        this.state = {
            'box': {},
            onview: this.props.viewport || false
        }
    }
    print = () => {
        if (!this.ref) return;
        //@ts-ignore
        if (this.printer) {
            this.printer.destroy()
            this.printer = 0
        }

        this.printer = new Typed(this.ref, {
            strings: [this.text],
            typeSpeed: (this.props.multiline) ? 10 : 40,
            backSpeed: 0,
            backDelay: 500,
            startDelay: (this.props.viewport) ? 200 : 1000,
            cursorChar: '<span style="pointer-events:none;user-select:none">_</span>',
            loop: false
        })
    }

    componentDidMount() {
        if (!this.ref) return;
        const inner = (' ' + this.ref.innerHTML).slice(1)
        const content = (' ' + this.ref.innerText).slice(1)
        this.text = ((inner || '').slice(0, this.props.limit ? this.props.limit + 1 : undefined))
        if (this.props.limit)
            this.text += ((this.props.limit < content.length) ? "..." : '')
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.font = window.getComputedStyle(this.ref || this.ref, null).getPropertyValue('font')
        const box = ctx.measureText(this.text)
        this.setState({ box })
        this.ref.innerHTML = ''
        
        if (this.props.viewport) {
            this.observer = new IntersectionObserver(([entry]) => {
                this.setState({ onview: entry.isIntersecting });
                if (this.state.onview && this.props.viewport) this.print()
            }, {})
            this.observer.observe(this.ref)
        }
        if (!this.props.viewport) this.print()
    }

    componentWillUnmount() {
        this.printer?.destroy()
        if (this.ref)
            this.observer?.unobserve(this.ref)
    }
    render(): ReactNode {
        return (
            <div className="relative">
                <span ref={this.assign_ref} className={`${this.props.multiline ? 'relative' : 'inline-block'}`} style={{ 'minHeight': this.state.box?.fontBoundingBoxAscent + this.state.box?.fontBoundingBoxDescent || 1, }}>
                    {this.props.children}
                </span>
            </div>
        )
    }
}