export default {
    state: {
        posts: []
    },
    getters: {
        validPost(state) {
            return state.posts.filter(p => {
                return p.title && p.body
            })
        },
        allPosts(state) {
            return state.posts
        },
        postCounts(state, getters) {
            return getters.validPost.length
        }
    },
    actions: {
        async fetchPosts(ctx, limit = 3) {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
            const post = await res.json()

            // первым аргументом передаем название mutation,
            // вторым данные которые хотим изменить
            ctx.commit('updatePosts', post)

            // вызов другого action изнутри
            ctx.dispatch('sayHello')
        },
        sayHello () {}
    },
    mutations: {
        /** обновляем посты
         * @param state - текущее состояние
         * @param posts - новое состояние
         */
        updatePosts(state, posts) {
            state.posts = posts
        },
        createPost(state, newPost) {
            state.posts.unshift(newPost)
        },
    },
}