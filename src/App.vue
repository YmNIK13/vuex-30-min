<template>
	<div id="app">
		<PostForm />
		<h1>{{postCounts}} - постов</h1>
		<div class="post" v-for="post in validPost" :key="post.id">
			<h2>{{post.title}}</h2>
			<p>{{post.body}}</p>
		</div>
	</div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import PostForm from './components/PostForm'

    export default {
        name: 'App',
        computed: mapGetters(['allPosts', 'validPost', 'postCounts']),
	    methods: mapActions(['fetchPosts']),
        async mounted() {
	        this.fetchPosts(14);
        },
	    components: {
            PostForm,
	    }
    }
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin: 60px auto;
		width: 400px;
	}

	.post {
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-bottom: 1rem;
	}
</style>
