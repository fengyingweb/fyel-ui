<template>
  <div class="fy-uploader">
    <slot></slot>
    <input
      class="fy-uploader__input"
      ref="input"
      type="file"
      :name="name"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      @change="onChange"/>
  </div>
</template>

<script>
export default {
  name: 'fy-uploader',
  inheritAttrs: false,
  props: {
    name: String,
    multiple: Boolean,
    disabled: Boolean,
    beforeRead: Function,
    afterRead: Function,
    accept: {
      type: String,
      default: 'image/*'
    },
    resultType: {
      type: String,
      default: 'dataUrl'
    },
    maxSize: {
      type: Number,
      default: Number.MAX_VALUE
    }
  },
  computed: {
    detail() {
      return {
        name: this.name || ''
      }
    }
  },

  methods: {
    onChange(event) {
      let {files} = event.target
      if (this.disabled || !files.length) {
        return;
      }
      files = files.length === 1 ? files[0] : [].slice.call(files, 0)
      if (!files || (this.beforeRead && !this.beforeRead(files, this.detail))) {
        this.resetInput()
        return;
      }

      if (Array.isArray(files)) {
        Promise.all(files.map(this.readFile)).then(contents=> {
          let oversize = false
          const payload = files.map((file, index)=> {
            if (file.size > this.maxSize) {
              oversize = true
            }
            return {
              file: files[index],
              content: contents[index]
            }
          })
          
          this.onAfterRead(payload, oversize)
        })
      } else {
        this.readFile(files).then(content=> {
          this.onAfterRead(
            {file: files, content},
            files.size > this.maxSize
          )
        })
      }
    },

    readFile(file) {
      return new Promise(resolve => {
        const reader = new FileReader()
        
        reader.onload = event => {
          resolve(event.target.result)
        }

        if (this.resultType === 'dataUrl') {
          reader.readAsDataURL(file)
        } else if (this.resultType === 'text') {
          reader.readAsText(file)
        }
      })
    },

    resetInput() {
      this.$refs.input && (this.$refs.input.value = '')
    },

    onAfterRead(files, oversize) {
      if (oversize) {
        this.$emit('oversize', files)
      } else {
        this.afterRead && this.afterRead(files, this.detail)
      }
      this.resetInput()
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
