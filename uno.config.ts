import { presetWind } from '@unocss/preset-wind'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['src/**/*.{ts,tsx}']
  },
  presets: [presetWind()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
