import { extend } from 'lodash'

const show = {
  title: 'Futurama',
  subtitle: `Intergalactic conspiracies and other strange stuff`,
  summary: `Hatched from Matt Groening's brain, Futurama follows pizza guy Philip J. Fry, who reawakens in 31st century New New York after a cryonics lab accident.`,
  poster: 'static/example/coverimage.png',
  url: 'http://fillerama.io/'
}

const episode = {
  title: 'Five hours?',
  subtitle: `Why am I sticky and naked? Did I miss something fun? In your time, yes, but nowadays shut up! Besides, these are adult stemcells, harvested from perfectly healthy adults whom I killed for their stemcells.`,
  summary: `Ah, computer dating. It's like pimping, but you rarely have to use the phrase "upside your head." Who am I making this out to? Okay, I like a challenge. As an interesting side note, as a head without a body, I envy the dead.`,
  publicationDate: '2016-02-11T03:13:55+00:00',
  poster: 'static/example/coverimage.png',
  duration: '01:30:32'
}

const contributors = [
  {
    avatar: 'static/example/fry.jpg',
    name: 'Philip J. Fry'
  },
  {
    avatar: 'static/example/farnsworth.png',
    name: 'Professor Farnsworth'
  },
  {
    avatar: 'static/example/leela.jpg',
    name: 'Turanga Leela'
  }
]

const chapters = [
  { start: '00:00:00', title: 'With gusto.' },
  { start: '00:01:39', title: 'Good news' },
  { start: '00:04:58', title: 'You stole the atom' },
  { start: '00:18:37', title: `Oh, I don't have time for this` },
  { start: '00:33:40', title: 'Her company is big and evil!' },
  { start: '00:35:37', title: 'Have you ever tried just turning off the TV' },
  { start: '01:17:26', title: 'Hello, little man' },
  { start: '01:24:55', title: 'Take me to your leader!' }
]

const files = [
  {
    url: 'http://techslides.com/demos/samples/sample.m4a',
    mimeType: 'audio/mp4',
    size: 93260000,
    title: 'Audio MP4'
  },
  {
    url: 'http://techslides.com/demos/samples/sample.mp3',
    mimeType: 'audio/mp3',
    size: 14665000,
    title: 'Audio MP3'
  },
  {
    url: 'http://techslides.com/demos/samples/sample.ogg',
    mimeType: 'audio/ogg',
    size: 94400000,
    title: 'Audio Ogg'
  }
]

const state = {
  show,
  episode,
  contributors,
  files,
  chapters
}

const mutations = {
  setMeta (state, meta) {
    extend(state, meta)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
