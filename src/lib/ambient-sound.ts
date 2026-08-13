export type AmbientMode = "none" | "rain" | "warm";

export type AmbientSound = {
  mode: AmbientMode;
  play: (volume: number) => Promise<void>;
  pause: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
};

const fadeSeconds = 0.8;

function createNoiseBuffer(context: AudioContext, mode: Exclude<AmbientMode, "none">) {
  const duration = 5;
  const buffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate);
  const data = buffer.getChannelData(0);
  let previous = 0;

  for (let index = 0; index < data.length; index += 1) {
    const white = Math.random() * 2 - 1;
    if (mode === "warm") {
      previous = (previous + 0.018 * white) / 1.018;
      data[index] = previous * 3.2;
    } else {
      data[index] = white * 0.72 + previous * 0.28;
      previous = white;
    }
  }

  return buffer;
}

function safeVolume(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function createAmbientSound(mode: Exclude<AmbientMode, "none">): AmbientSound {
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0;
  master.connect(context.destination);

  const noise = context.createBufferSource();
  noise.buffer = createNoiseBuffer(context, mode);
  noise.loop = true;

  const filter = context.createBiquadFilter();
  const noiseGain = context.createGain();

  if (mode === "rain") {
    filter.type = "bandpass";
    filter.frequency.value = 2200;
    filter.Q.value = 0.42;
    noiseGain.gain.value = 0.34;
  } else {
    filter.type = "lowpass";
    filter.frequency.value = 520;
    filter.Q.value = 0.5;
    noiseGain.gain.value = 0.52;

    [174.61, 261.63].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const oscillatorGain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillatorGain.gain.value = index === 0 ? 0.018 : 0.009;
      oscillator.connect(oscillatorGain).connect(master);
      oscillator.start();
    });
  }

  noise.connect(filter).connect(noiseGain).connect(master);
  noise.start();

  function fadeTo(value: number) {
    const now = context.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(safeVolume(value), now + fadeSeconds);
  }

  return {
    mode,
    async play(volume) {
      await context.resume();
      fadeTo(volume);
    },
    pause() {
      fadeTo(0);
    },
    setVolume(volume) {
      fadeTo(volume);
    },
    destroy() {
      void context.close();
    },
  };
}
