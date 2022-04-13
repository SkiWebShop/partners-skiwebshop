<template>
    <component
        :is="type"
        v-bind="$attrs"
        role="button"
    >
       <div class="h-12 inline-flex items-center bg-slate-200 px-3 py-2 rounded-md mr-2">
           <slot></slot>
       </div>
    </component>
</template>

<script>
export default {
    props: {
        routerLink: {
            type: Boolean,
            default: false
        },
        ishref: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        type() {
            if(this.ishref) {
                return 'a'
            }
            return this.routerLink ? 'router-link' : 'button'
        }
    }

}
</script>