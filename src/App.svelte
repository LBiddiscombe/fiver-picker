<script>
  import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs'
  import Icon from 'svelte-awesome'
  import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
  import Players from './components/Players.svelte'
  import Teams from './components/Teams.svelte'
  import { onMount, onDestroy } from 'svelte'

  let loggedInUser

  onMount(() => {
    netlifyIdentity.on('init', (user) => {
      console.log('init', user)
      loggedInUser = netlifyIdentity.currentUser()
      if (!user) netlifyIdentity.open('login')
    })
    netlifyIdentity.on('login', (user) => {
      console.log('login', user)
      loggedInUser = netlifyIdentity.currentUser()
    })
    netlifyIdentity.on('logout', () => {
      console.log('logout')
      loggedInUser = null
    })
    netlifyIdentity.on('error', (err) => console.error('Error', err))
    netlifyIdentity.on('open', () => console.log('Widget opened'))
    netlifyIdentity.on('close', () => console.log('Widget closed'))
  })

  onDestroy(() => {
    netlifyIdentity.off('login')
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

  button {
    display: flex;
    align-items: center;
  }
</style>

<main>
  {#if loggedInUser}
    <button on:click={() => netlifyIdentity.logout()}>Sign Out&nbsp;
      <Icon data={faSignOutAlt} class="icon" scale="1" />
    </button>
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
  {:else}
    <button on:click={() => netlifyIdentity.open('login')}>Sign In&nbsp;
      <Icon data={faSignInAlt} class="icon" scale="1" /></button>
  {/if}
</main>
