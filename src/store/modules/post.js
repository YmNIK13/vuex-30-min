export default {
    actions: {
        async fetchPosts(ctx, limit =3) {
            const res = await fetch( `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
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
    getters: {
        allPosts(state) {
            return state.posts
        }
    },
}