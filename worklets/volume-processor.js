class VolumeMeter extends AudioWorkletProcessor {
  constructor() {
    super();
    this.volume = 0;
    this.oldTime = currentTime;
  }

  calVolume(inputs) {
    const inputChannelData = inputs[0][0];
    let sum = 0;
    for (let i = 0; i < inputChannelData.length; i++) {
      sum += Math.pow(inputChannelData[i], 2);
    }
    const rms = Math.sqrt(sum / inputChannelData.length);

    this.volume = Math.max(rms, this.volume * 0.9);

    if (currentTime - this.oldTime > 0.2) {
      this.port.postMessage({
        eventType: 'volume',
        volume: this.volume * 100,
      });
      this.oldTime = currentTime;
    }
  }
  process(inputs, outputs) {
    this.calVolume(inputs);
    return true;
  }
}

registerProcessor('vumeter', VolumeMeter);
