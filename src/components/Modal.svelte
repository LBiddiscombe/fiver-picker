<script>
  import { fly } from 'svelte/transition'
  import Icon from 'svelte-awesome'
  import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
  import { createEventDispatcher, onDestroy } from 'svelte'

  const dispatch = createEventDispatcher()
  const close = () => dispatch('close')

  let modal

  const handle_keydown = (e) => {
    if (e.key === 'Escape') {
      close()
      return
    }

    if (e.key === 'Tab') {
      // trap focus
      const nodes = modal.querySelectorAll('*')
      const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0)

      let index = tabbable.indexOf(document.activeElement)
      if (index === -1 && e.shiftKey) index = 0

      index += tabbable.length + (e.shiftKey ? -1 : 1)
      index %= tabbable.length

      tabbable[index].focus()
      e.preventDefault()
    }
  }

  const previously_focused = typeof document !== 'undefined' && document.activeElement

  if (previously_focused) {
    onDestroy(() => {
      previously_focused.focus()
    })
  }
</script>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 40%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1rem;
    border-radius: 0.2em;
    background: black;
    border: 2px solid rgba(255, 255, 255, 0.5);
    text-align: center;
    z-index: 5;
  }

  button {
    margin: 0;
    border: none;
    display: flex;
    align-items: center;
    background: none;
    position: absolute;
    color: rgba(255, 255, 255, 0.5);
    top: 0;
    right: 0;
  }
</style>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-background" on:click={close} />

<div transition:fly={{ y: 50 }} class="modal" role="dialog" aria-modal="true" bind:this={modal}>
  <button class="close" on:click={close}>
    <Icon data={faWindowClose} class="icon" scale="2" />
  </button>
  <slot name="header" />
  <slot />
</div>
