import * as Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import Hello from './Hello'

@Component
export default class extends Vue {
    text = ''

    render() {
        return (
            <div>
                <Hello name={this.text} />
                <input type="text" placeholder="Input your name" v-model={this.text} />
            </div>
        )
    }

    @Watch('text')
    onInput() {
        console.log(this.text)
    }
}
