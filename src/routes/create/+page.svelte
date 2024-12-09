<script lang="ts">
  import { onMount } from 'svelte';
  
  // Variables for form data and image preview
  let title: string = '';
  let description: string = '';
  let filter: string = '';
  let image: string | null = null;  // Explicit type for image
  let successMessage: string = '';
  let selectedImage: { upload_time: string } = { upload_time: '' }; // Add a selected image property

  // Filter options
  const filterOptions: string[] = ['Grayscale', 'Sepia', 'Invert', 'Blur', 'Brightness', 'Contrast', 'Saturate', 'Hue Rotate', 'Opacity', 'Drop Shadow'];

  // File input reference
  let fileInput: HTMLInputElement;

  // Function to handle file selection and preview
  function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      image = URL.createObjectURL(file);
    }
  }

  // Handle dragover and drop events
  function onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      image = URL.createObjectURL(file);
    }
  }

  // Trigger file input dialog
  function triggerFileInput() {
    fileInput.click();
  }

  // Handle filter change
  function handleFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    filter = target.value;
  }

  // Form submission
  function handleSubmit() {
    console.log('Form Submitted:', { title, description, filter });
    successMessage = 'Image successfully uploaded!';
  }

  // Get the appropriate filter class based on selected filter
  function getFilterClass() {
    return filter ? `filter-${filter.toLowerCase().replace(/\s+/g, '-')}` : '';
  }

  // Function to close the modal
  function closeModal() {
    console.log('Modal closed');
  }
</script>

<style>
  .container {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
  }

  .create-pin-container {
    display: flex;
    gap: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 50px;
    width: 80%;
  }

  .image-upload-container {
    flex: 1;
    border: 2px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    position: relative;
    cursor: pointer;
  }

  .file-drop-placeholder {
    text-align: center;
    color: #999;
    font-size: 1.2em;
  }

  .file-drop-preview img {
    max-width: 100%;
    max-height: 300px;
    border-radius: 10px;
  }

  .form-container {
    flex: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  .form-group textarea {
    resize: vertical;
  }

  button {
    padding: 10px 20px;
    background-color: #4B5945;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #B2C9AD;
  }

  .image-upload-container img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    transition: filter 0.3s ease;
  }

  .filter-grayscale {
    filter: grayscale(100%);
  }

  .filter-sepia {
    filter: sepia(100%);
  }

  .filter-invert {
    filter: invert(100%);
  }

  .filter-blur {
    filter: blur(5px);
  }

  .filter-brightness {
    filter: brightness(150%);
  }

  .filter-contrast {
    filter: contrast(150%);
  }

  .filter-saturate {
    filter: saturate(150%);
  }

  .filter-hue-rotate {
    filter: hue-rotate(90deg);
  }

  .filter-opacity {
    filter: opacity(80%);
  }

  .filter-drop-shadow {
    filter: drop-shadow(10px 10px 5px rgba(0, 0, 0, 0.5));
  }

  .success-alert {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    margin-bottom: 15px;
    text-align: center;
    border-radius: 5px;
  }
</style>



{#if successMessage}
  <div class="success-alert">
    {successMessage}
  </div>
{/if}

<div class="container">
  <div class="create-pin-container">
    <!-- Image Upload Area -->
    <div
      class="image-upload-container"
      on:dragover={onDragOver}
      on:drop={onDrop}
      on:click={triggerFileInput}
      role="button"
      tabindex="0"
      aria-label="Upload Image"
      on:keydown={(event) => { 
        if (event.key === 'Enter' || event.key === ' ') triggerFileInput(); 
      }} 
    >
      {#if !image}
        <div class="file-drop-placeholder">Drag and drop an image or click to upload</div>
      {:else}
        <div class="file-drop-preview">
          <img id="previewImage" src={image} class={getFilterClass()} alt="Preview" />
        </div>
      {/if}
      <input type="file" bind:this={fileInput} on:change={onFileChange} hidden />
    </div>

    <!-- Form Area -->
    <div class="form-container">
      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
          <label for="title">Title</label>
          <input id="title" bind:value={title} />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" bind:value={description}></textarea>
        </div>

        <div class="form-group">
          <label for="filter">Filter</label>
          <select id="filter" bind:value={filter} on:change={handleFilterChange}>
            <option value="">Select a filter</option>
            {#each filterOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
  </div>
</div>
