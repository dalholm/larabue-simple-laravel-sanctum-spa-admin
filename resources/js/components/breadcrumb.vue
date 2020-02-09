<template>
    <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
        <ul>
            <li>
                <router-link :to="{name: 'dashboard'}">dashboard</router-link>
            </li>
            <li v-for="crumb in crumbs">
                <router-link :to="crumb.to">{{crumb.text}}</router-link>
            </li>

        </ul>
    </nav>
</template>

<script>
    const defaults = {
        crumbs: [
            {
                to: '/',
                name: 'Start'
            }
        ]
    };
export default {

    data () {
      return {

      }
    },
    computed: {
        crumbs() {
            let pathArray = this.$route.path.split("/")
            pathArray.shift();
            let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
                if (path == '') {
                    return [];
                }
                breadcrumbArray.push({
                    path: path,
                    to: breadcrumbArray[idx - 1]
                        ? "/" + breadcrumbArray[idx - 1].path + "/" + path
                        : "/" + path,
                    text: path,
                });
                return breadcrumbArray;
            }, []);
            return breadcrumbs;
        }
    },
}
</script>
