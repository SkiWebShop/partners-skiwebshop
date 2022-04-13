<template>
    <div class="flex flex-wrap">
        <label :for="labelFormatted" v-if="label" class="basis-full">
            {{label}}
            <span v-if="required" class="text-slate-800">*</span>
        </label>
        <input
            :type="inputType"
            class="peer basis-full border-b-2 border-main mt-4 px-2 py-1 ease-linear duration-75 outline-none focus:shadow-sm" 
            v-bind="$attrs"
            :class="submitClasses('input')"
            :name="labelFormatted"
            :id="labelFormatted"
            :placeholder="placeholder"
            :required="required"
        />
        <small class="hidden" :class="submitClasses('small')">Controleer alsjeblieft dit veld. Kan een fout in zitten</small>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        required: Boolean,   
        placeholder:String,
        submitted: Boolean,
        type: String,
    },
    methods: {
        submitClasses(which) {
            const classes = {
                input: 'invalid:border-red-500 invalid:shadow-md invalid:shadow-red-100',
                small: 'peer-invalid:inline'
            }
            return {
                [classes[which]]: this.submitted
            }
        },
    },
    computed: {
        labelFormatted() {
            if(this.label) {
                return this.label.replace(' ','_').toLowerCase()
            } else {
                return this.placeholder.replace(' ','_').toLowerCase()
            }
        },
        inputType() {
            return this.type || 'text'
        }
    }
}
</script>