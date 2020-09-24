<script>
  import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs'
  import * as netlifyIdentity from 'netlify-identity-widget'

  import Players from './components/Players.svelte'
  import Teams from './components/Teams.svelte'
  import { onMount } from 'svelte'

  let user

  onMount(() => {
    netlifyIdentity.init()
    user = netlifyIdentity.currentUser()
    netlifyIdentity.on('init', (user) => console.log('init', user))
    netlifyIdentity.on('login', (user) => console.log('login', user))
    netlifyIdentity.on('logout', () => console.log('Logged out'))
    netlifyIdentity.on('error', (err) => console.error('Error', err))
    netlifyIdentity.on('open', () => console.log('Widget opened'))
    netlifyIdentity.on('close', () => console.log('Widget closed'))
  })
</script>

<style>
  main {
    position: relative;
    padding: 1em;
    max-width: 400px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: 800px;
    }
  }

  :global(.svelte-tabs li.svelte-tabs__tab) {
    color: white;
    font-size: 1.5rem;
  }
</style>

<main>
  {#if user}
    <Tabs initialSelectedIndex={0}>
      <TabList>
        <Tab>Players</Tab>
        <Tab>Teams</Tab>
      </TabList>

      <TabPanel>
        <Players />
      </TabPanel>

      <TabPanel>
        <Teams />
      </TabPanel>
    </Tabs>
  {/if}
</main>
