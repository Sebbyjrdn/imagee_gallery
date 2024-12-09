<script lang="ts">
    // Define the 'images' array with specific types for each image's properties
    export let images: Array<{
      id: string | number;
      image_path: string;
      title?: string;  // 'title' is optional
      uploader: string;
      upload_time: string | Date;
    }> = [];
  
    // Function to delete an image based on its id
    const deleteImage = (id: string | number) => {
      images = images.filter(image => image.id !== id);
    };
  </script>
  
  <main>
    <div class="image-grid">
      {#each images as image}
        <div class="image-item">
          <div class="image-container">
            <img src={image.image_path} alt={image.title || 'Uploaded Image'} />
            <div class="overlay">
              <div class="uploader-info">
                By {image.uploader}<br />
                Uploaded time: {new Date(image.upload_time).toLocaleString()}
              </div>
            </div>
          </div>
          <button class="delete-button" on:click={() => deleteImage(image.id)}>🗑️</button>
        </div>
      {/each}
    </div>
  </main>
  
  <style>
    /* Your CSS styles go here */
    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
  
    .image-item {
      position: relative;
    }
  
    .image-container {
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .image-container img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 10px;
    }
  
    .overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 10px;
      box-sizing: border-box;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  
    .image-container:hover .overlay {
      opacity: 1;
    }
  
    .uploader-info {
      font-size: 14px;
      line-height: 1.5;
    }
  
    .delete-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }
  
    .delete-button:hover {
      color: red;
    }
  </style>
  