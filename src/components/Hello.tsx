import * as Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop() name

    render() {
        if (this.name)
            return (
                <div>
                    Hello {this.name}!!!
                </div>
            )

        return <div>What's your name?</div>
    }
}
