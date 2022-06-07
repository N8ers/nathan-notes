# Vue 3 stuff

## Setup notes

Running `npm init vue@latest` gives you options for `pinia`, `vitest`, and `cypress`!!!

## Composables

Vue3's answer to mixins! They are functions that can be imported. Usually in a `use` directory and use the prefix `use`, ex ) `@/use/useUsername.js`.

**COMPOSABLES SHARE STATE** - They can be used as a state management solution.

```js
// Composable
import { ref } from "vue";

export function useUsername() {
  const username = ref("");
  function updateUsername(newUsername) {
    username.value = newUsername;
  }
  return {
    username,
    updateUsername,
  };
}
```

```vue
# Add it to MyComponent.vue
<script setup>
import { useUsername } from "/@use/useUsername";

const { username, updateUsername } = useUsername();

onMounted(() => {
  updateUsername("Tsuki");
});
</script>
```

## Options vs Composition (setup function) vs Composition (script setup)

```vue
# Options

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    },
  },
};
</script>
```

```vue
# Composition (setup function)

<script>
import { ref } from "vue";

export default {
  setup() {
    const counter = ref(0);

    // You can declear methods as named functions or as variables
    function increase() {
      counter.value++;
    }

    const decrease = () => {
      counter.value--;
    };

    return {
      counter,
      increase,
      decrease,
    };
  },
};
</script>
```

```vue
# Composition (script setup)

<script setup>
import { ref } from "vue";

const counter = ref(0);

function increase() {
  counter.value++;
}

const decrease = () => {
  counter.value--;
};
</script>
```

## Methods, Computed, Watch

```vue
<template>
  <div>
    <span>Count: {{ count }}</span>
    <span>Count is: {{ evenOrOdd }}</span>
    <button @click="add(1)">+</button>
    <button @click="add(2)">++</button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const count = ref(0);

// METHODS
const add = (numberToAdd = 1) => {
  count.value += numberToAdd;
};

// COMPUTED
const evenOrOdd = computed(() => {
  if (count.value % 2 === 0) {
    return "even";
  }
  return "odd";
});

// WATCH
watch(
  () => count.value,
  (newCount, oldCount) => {
    if (newCount === 10 && oldCount === 9) {
      alert("you mad it from 9 to 10!");
    }
  }
);
</script>
```

## Life cycle hooks

```vue
<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onBeforeUpdate,
  onUpdated,
} from "vue";

// THESE ARE IN THE ORDER THEY WOULD FIRE
onBeforeMount(() => {
  console.log("mounted");
});

onMounted(() => {
  console.log("onMounted");
});

onBeforeUnmount(() => {
  console.log("onBeforeUnmounted");
});

onUnmounted(() => {
  console.log("onUnmounted");
});

// THESE TWO WILL ONLY BE USED IF 'KEEP ALIVE'
onActivated(() => {
  console.log("onActivated");
});

onDeactivated(() => {
  console.log("onDeactivated");
});

// BEFORE TEMPLATE UPDATES (like count++)
onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
});

// AFTER A TEMPLAT IS UPDATED
onUpdated(() => {
  console.log("onUpdate");
});
</script>
```

# Vue Test Utils

The offical testing utility library for Vue.js. VTU is a set of utility functions aimed to simplify testing Vue components.

## Mounting Components

There are two ways to mount a component, a `mount` and `shallowMount`.

- `Mounting` - Creates a wrapper that contains the mounted and rendered Vue component.
- `Shallow mounting` - Does the same but it stubs child elements. This is helpful for test speed, and to avoid bloat. `Shallow mounting is not the suggest way of testing components unless you face performance issues or need to simplift test arrangements`

```js
import { mount } from "@vue/test-utils";

const DummyComponent = {
  template: "<p>{{ message }}</p>",
  props: ["message"],
  data() {
    return {};
  },
};

test("display message", () => {
  const wrapper = mount(DummyComponent, {
    propsData: {
      message: "Allo!",
    },
  });

  expect(wrapper.text()).toContain("Allo!");
});
```

## Locating elements

We want to be able to find certain parts of the component to test.

```js
const wrapper = mount(DummyComponent);
const message = wrapper.find("p");
expect(message.text()).toContain("Allo!");
```

## Simulating User Interaction

This is just an example of

```js
const ButtonComponent = {
  template: "<div><h1>Btn Component</h1><button>Click Me!</button></div>",
};

const wrapper = mount(ButtonComponent);
const button = wrapper.find("button");
button.trigger("click");
```

## Lifecycle Hooks

Lifecycle hooks still happen, except for `beforeDestroy` and `destroyed`. Additionally, the component will not be automatically destroyed at the end of each test!

## Async testing

If you need to await updates after a user event, you can simply use await on the trigger.

```js
await wrapper.trigger("click");
```

## Asserting Emitted Events

```js
wrapper.vm.$emit("foo");
expect(wrapper.emitted().foo).toBeTruthy();
expect(wrapper.emitted().foo.legnth).toBe(1);

wrapper.vm.$emit("foo", 123);
expect(wrapper.emitted().foo[1].toEqual([123]));

// Get an array of events in their emit order
const orderedEmitEvents = wrapper.emittedByOrder();
```

## Emitting events from Child Component

```js
import { mount } from "@vue/test-utils";
import ParentComponent from "@/components/ParentComponent";
import ChildComponent from "@/components/ChildComponent";

test("emit from childComponent", () => {
  const wrapper = mount(ParentComponent);
  wrapper.findComponent(ChildComponent).vm.$emit("emitMessageToParent");
});
```

## Manipulating Component State

You can directly manipulate the state of the component using `setData` and `setProps`.

```js
await wrapper.setData({ count: 10 });
await wrapper.setProps({ message: "Allo" });
```

## Mocking Props

You can pass props to the component using `propsData` when you are mounting the component.

```js
const wrapper = mount(Component, {
  propsData: {
    title: "I am Component",
  },
});
```

## Mocking Transitions

I don't plan on taking notes on this, but wanted to note it exists.

## Apply Global Plugins and Mixins

Some components may rely on features injected by a global plugin or mixin, such as `pinia` and `vue-router`. We can use `createLocalVue` to isolate/control the vue setup.

```js
import { createLocalVue, mount } from "@vue/test-utils";

// create an extend `Vue` constructor
const localVue = createLocalVue();

// instal plugins as normal
localVue.use(MyPlugin);

// pass the `localVue` to the mount options
const wrapper = mount(Component, {
  localVue,
});
```

## Mocking Injections

Another strategy for injecting props is mocking them.

```js
import { mount } from "@vue/test-utils";

const $route = {
  path: "/",
  params: { id: "123" },
  query: { q: "allo" },
};

const wrapper = mount(Component, {
  mocks: {
    // Adds a mocked `$route` object to the Vue instance, before mounting component
    $route,
  },
});
```

## Stubbing Components

You can override components that are registered globally or locally by using the stubs option.

```js
import { mount } from "@vue/test-utils";

const wrapper = mount(Component, {
  stubs: ["globally-registered-component"],
});
```

## Controlling Key, Mouse, and other DOM events

```js
const wrapper = mount(Component);

// Click Event
await wrapper.find("button").trigger("click");

// Key Events
await wrapper.trigger("keydown.up");
await wrapper.trigger("keydown.esc");
await wrapper.trigger("keydown.esc");
await wrapper.trigger("keydown", {
  key: "a",
});
```

## Router

You should never install vue router on the Vue base constructor, as it makes `$route` and `$router` read-only properties. Use `localVue` instead. To test components that use `router-link` or `router-view`, we can use `stubs` or add Vue Router to `localVue`.

```js
// Using stubs:
import { shallowMount } from "@vue/test-utils";

const wrapper = shallowMount(Component, {
  stubs: ["router-link", "router-view"],
});

// Using localVue:
import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

const wrapper = mount(Component, {
  localVue,
  router,
});
```

Mocking `$route` and `$router`. Sometimes you want to test that a component does something with the parameters from the `$route` and `$router` objects, you can do that with a mock.

```js
import { shallowMount } from "@vue/test-utils";

const $route = {
  path: "/some/path",
};

const wrapper = shallowMount(Component, {
  mocks: {
    $route,
  },
});

wrapper.vm.$route.path; // -> '/some/path'
```

## Testing Pinia

### Unit Testing a Store

```js
// counterStore.spec.js
import { setActivePinia, createPinia } from "pinia";
import { useCounter } from "../src/stores/counter";

describe("Counter Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked up by any `useStore()` call
    setActivePinia(createPinia());
  });

  it("increments", () => {
    const counter = useCounter();
    expect(counter.number).toBe(0);

    // fire `increment` action
    counter.increment();
    expect(counter.number).toBe(1);
  });
});
```

### Unit Testing Components

We will unit test with `createTestPinia()`, which returns a pinia instance designed to help unit testing.
We will also need `npm i -D @pinia/testing`.

```js
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

const wrapper = mount(Counter, {
  globals: {
    plugins: [createTestingPinia()],
  },
});

const store = useSomeStore(); // uses the testing pinia

// state can be directly manipulated
store.name = "my new name";

// state can be manipulated with 'patch'
store.$patch({ name: "new name" });
expect(store.name).toBe("new name");

// actions are stubbed by default, meaning they don't execute their code by default.
store.someAction();

expect(store.someAction).toHaveBeenCalledTimes(1);
expect(store.someAction).toHaveBeenLastCalledWith();
```

### Initial State

You can set the initial state of stores with the `initialState` object.

```js
const wrapper = mount(Counter, {
  global: {
    plugins: [
      createTestingPinia({
        initialState: {
          counter: { number: 20 }, // Initializes counter.number to start at 20!
        },
      }),
    ],
  },
});
const store = useSomeStore();
expect(store.number).toBe(20);
```

### Customizing behavior of actions

`createTestingPinia` stubs out all actions, unless told otherwise. This is to allow testing components and stores seperately. You can change that!

```js
const wrapper = mount(Component, {
  global: {
    plugins: [createTestingPinia({ stubActions: false })],
  },
});

const store = useSomeStore();

// Now this will fire the action!
store.someAction();

// We can still inspect calls
expect(store.someAction).toHaveBeenCalledTimes(1);
```

### Mocking getters

By default getters will be computed like normal, but you can manually force a value by setting the getter.

```js
const pinia = createTestingPinia();
const counter = useCounter(pinia);

// Manaully set the 'double' getter return value. (For this example pretend this getter exists in the store)
counter.double = 3;
```

## Pinia

```js
// Store
import { defineStore } from "pinia";

export const useCountStore = defineStore({
  id: "count",
  state: () => ({
    count: 0,
  }),
  actions: {
    add() {
      this.count++;
    },
    addTen(num) {
      this.count += num;
    },
  },
  getters: {
    oddOrEven(state) {
      return state.count % 2 === 0 ? "even" : "odd";
    },
  },
});
```

```vue
// Component
<template>
  <div>
    <h2>Count: {{ counter.count }}</h2>
    <h4>Current Count Is: {{ counter.oddOrEven }}</h4>
    <button @click="counter.add">Add Another!</button>
    <button @click="counter.addTen(10)">Add 10!</button>
  </div>
</template>

<script setup>
import { useCountStore } from "@/stores/counter";

const counter = useCountStore();
</script>
```

## Some Philosophy and Notes

- VTU recomends writing tests that `assert your component's public interface, and treat its internals as a black box.`.
- VTU recomends dealing with routing in e2e tests.

## Things I want to understand better

- Testing philosophy
- Mocking network requests
- Stubbs
- Testing Pinia
- Spys
