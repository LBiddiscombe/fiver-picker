<script>
  import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs'
  import Players from './components/Players.svelte'
  import Teams from './components/Teams.svelte'
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
</main>
