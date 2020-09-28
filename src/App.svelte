<script>
  import Icon from 'svelte-awesome'
  import { faSlidersH, faUsers, faTshirt } from '@fortawesome/free-solid-svg-icons'
  import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs'
  import Players from './components/Players.svelte'
  import Teams from './components/Teams.svelte'
  import Settings from './components/Settings.svelte'
  import { onMount, getContext } from 'svelte'

  let group = localStorage.getItem('group') || 'MNF'

  onMount(() => {
    group = localStorage.getItem('group') || 'MNF'
  })
</script>

<style>
  main {
    position: relative;
    max-width: 400px;
    margin: 0 auto;
    touch-action: manipulation;
  }

  @media (min-width: 640px) {
    main {
      max-width: 800px;
    }
  }

  .tab-title {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tab-title span {
    font-size: 0.75rem;
  }

  :global(.svelte-tabs li.svelte-tabs__tab) {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.5rem;
  }

  :global(.svelte-tabs li.svelte-tabs__selected) {
    color: white;
    border-bottom: solid white;
    background-color: rgba(255, 255, 255, 0.25);
  }
</style>

<main>
  <Tabs initialSelectedIndex={1}>
    <TabList>
      <Tab>
        <div class="tab-title">
          <Icon data={faSlidersH} class="icon" scale="2" />
          <span>Settings</span>
        </div>
      </Tab>
      <Tab>
        <div class="tab-title">
          <Icon data={faUsers} class="icon" scale="2" />
          <span>Players</span>
        </div>
      </Tab>
      <Tab>
        <div class="tab-title">
          <Icon data={faTshirt} class="icon" scale="2" />
          <span>Teams</span>
        </div>
      </Tab>
    </TabList>

    <TabPanel>
      <Settings bind:group />
    </TabPanel>

    <TabPanel>
      <Players {group} />
    </TabPanel>

    <TabPanel>
      <Teams />
    </TabPanel>
  </Tabs>
</main>
