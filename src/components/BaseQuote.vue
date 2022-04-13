<template>

<div class="bg-white text-blue">
    <p class="px-5 py-8 text-center text-3xl font-bold md:w-1/2  m-auto">
        <fa-icon :icon="['fa', 'quote-left']" class="mr-2" />
        <slot></slot>
        <fa-icon :icon="['fa', 'quote-right']" class="ml-2" />
    </p>
</div>

</template>