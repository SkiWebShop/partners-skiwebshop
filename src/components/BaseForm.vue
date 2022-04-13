<template>
    <form>
        <slot name="input" :submitted="submitted"></slot>
        <slot name="submit" >
            <LoginViewButton type="submit">Verstuur</LoginViewButton>
        </slot>
    </form>
</template>

<script>
import LoginViewButton from "./LoginViewButton.vue"

export default {
    data() {
        return {
            submitted: false
        }
    },
    components: { LoginViewButton }
}
</script>