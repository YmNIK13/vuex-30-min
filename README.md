# Vuex за 30

Учебный проект на основании видео

[![Основное видео](http://img.youtube.com/vi/c2SK1IlmYL8/0.jpg)](http://www.youtube.com/watch?v=c2SK1IlmYL8 "Все о Vuex за 30 минут")

[Официальный сайт](https://vuex.vuejs.org/ru/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

-----

## <a name="top">Оглавление</a>

1. Основы
   - [Принцип работы](#concept)
   - [Установка пакета](#init)

1. Работа Vuex
   - [Getter](#getter)
   - [Actions](#actions)



## <a name="concept">Принцип работы</a>
<a href="#top">Оглавление</a>

![Схема](https://habrastorage.org/webt/fu/pn/0e/fupn0eoshovoxxz1csrbzl67hoy.png)


## <a name="init">Установка пакета</a>
<a href="#top">Оглавление</a>

     npm i vuex

### Инициализация

Регистрируем Vuex и ниже возвращаем объект Store, 
который по итого надо передать в **main.js**

`Store` состоит из 5-ти свойств
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        // тут делаем асинхронный операции, вроде запросов к API
    },
    mutations: {
        // тут будут функции которые будут напрямую изменять store
    },
    state: {
        // тут определяем изначальные данные
    },
    getters: {
        // позволяют получать данне из store.
        // так же тут их трансформируем если это необходимо
    },
    modules: {
        // сюда регистрируем наши модули
    }
})
```

### Декомпозиция `Store`

Первые 4-е свойства из `Store`, мы декомпозируем в отдельные модули
```js
// ./modules/post.js
export default {
    actions: {},
    mutations: {},
    state: {},
    getters: {},
}
```

и регистрируем ('складывать в объект') в свойстве `modules` 
```js
import post from './modules/post'

export default new Vuex.Store({
    modules: {
        post
    }
})
```

-------------

## <a name="getter">Getter</a>
<a href="#top">Оглавление</a>

### Работа с данными
В самом модуле **post.js** получаем данные через `getter`
```js
export default {
    // ...
    state: {
        posts: []
    },
    getters: {
        allPosts(state) {
            return state.posts
        }
    },
}
```

А уже в приложении, после регистрации **Store**, 
в `this` нам доступен объект `$store` 
через который мы можем обращаться к нему

### Вызвать `getter`

```js
export default {
    computed: {
        allPosts(){
            return this.$store.getters.allPosts
        }
    },
}
``` 
В `Vuex` есть возможность получить доступ и через объекты, 
для вызова передаем массив с названиями getter-методов 
ниже приведенный код. аналогичный ранее приведенному.
```js
import {mapGetters} from 'vuex'
export default {
    computed:  mapGetters(['allPosts']),
}
``` 
В данном примере мы получили callback-функцию на геттер, который нам вернет посты  из `Store`

------

## <a name="actions">Actions</a>
<a href="#top">Оглавление</a>

### Получить `Action`
В `actions` мы выполняем асинхронные запросы к БД,  
но напрямую мы не можем обращаться к `state`,
потому делаем это через функцию `commit` (указана на [схеме](#concept), 
которая в свою очередь вызывается из `mutations` и внутри работает синхронно

```js
export default {
    actions: {
        async fetchPosts(ctx) {
            // получаем ассинхронно данные
            const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
            const post = await res.json()

            // первым аргументом передаем название mutation, 
            // вторым данные которые хотим изменить
            ctx.commit('updatePosts', post)
        }
    },
    mutations: {
        /** обновляем посты
         * @param state - текущее состояние
         * @param posts - новое состояние
         */
        updatePosts(state, posts){
            state.posts = posts
        }
    },
    state: {
        posts: []
    },
    // ...
}
``` 

### Вызвать `Action`
Сам по себе `action` не отработает потому его надо вызвать из компонента,
через функцию `dispatch` (указана на [схеме](#concept)  ) 
```js
export default {
    async mounted() {
        this.$store.dispatch('fetchPosts')
    },
}
```

Так же как из `getter` есть сокращенная запись и для `action`
```js
import {mapActions} from 'vuex'
export default {
    // ...
    methods: mapActions(['fetchPosts']),
    async mounted() {
        // и уже вызываем тут
        this.fetchPosts();
    },
}
```

### Передать параметры в `Action`
Если нам надо передать какие-то данные,
то мы можем их передать вторым параметром в асинхронную функцию `action`
```js
export default {
    actions: {
        async fetchPosts(ctx, limit =3) {
            const res = await fetch( `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
            // ...
        }
    },
    // ...
}
```
и уже в компоненте передать нужный параметр в вызов
```js
export default {
    // ...
    async mounted() {
        this.fetchPosts(5);
    },
}
```