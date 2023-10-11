(async () => {
  while (!(
      Spicetify?.Player &&
      Spicetify?.showNotification
    )){
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  Spicetify.showNotification("Lyrixed is ready!");
})()
