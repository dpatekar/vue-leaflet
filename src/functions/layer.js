import { inject, onUnmounted } from 'vue';

export const props = {
  pane: {
    type: String,
    default: 'overlayPane'
  },
  attribution: {
    type: String,
    default: null
  },
  name: {
    type: String,
    custom: true,
    default: undefined
  },
  layerType: {
    type: String,
    custom: true,
    default: undefined
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};

export const setup = (props, mapObject) => {
  const removeLayer = inject('removeLayer');

  const unbindTooltip = () => {
    const tooltip = mapObject ? mapObject.getTooltip() : null;
    if (tooltip) {
      tooltip.unbindTooltip();
    }
  };

  const unbindPopup = () => {
    const popup = mapObject ? mapObject.getPopup() : null;
    if (popup) {
      popup.unbindPopup();
    }
  };

  const options = {
    attribution: props.attribution,
    pane: props.pane
  };

  onUnmounted(() => {
    unbindPopup();
    unbindTooltip();
    removeLayer(this);
  });

  return options;
};

//   beforeDestroy() {
//     this.unbindPopup();
//     this.unbindTooltip();
//     this.parentContainer.removeLayer(this);
//   },
//   methods: {
//     setAttribution(val, old) {
//       const attributionControl = this.$parent.mapObject.attributionControl;
//       attributionControl.removeAttribution(old).addAttribution(val);
//     },
//     setName() {
//       this.parentContainer.removeLayer(this);
//       if (this.visible) {
//         this.parentContainer.addLayer(this);
//       }
//     },
//     setLayerType() {
//       this.parentContainer.removeLayer(this);
//       if (this.visible) {
//         this.parentContainer.addLayer(this);
//       }
//     },
//     setVisible(isVisible) {
//       if (this.mapObject) {
//         if (isVisible) {
//           this.parentContainer.addLayer(this);
//         } else {
//           if (this.parentContainer.hideLayer) {
//             this.parentContainer.hideLayer(this);
//           } else {
//             this.parentContainer.removeLayer(this);
//           }
//         }
//       }
//     },
//     unbindTooltip() {
//       const tooltip = this.mapObject ? this.mapObject.getTooltip() : null;
//       if (tooltip) {
//         tooltip.unbindTooltip();
//       }
//     },
//     unbindPopup() {
//       const popup = this.mapObject ? this.mapObject.getPopup() : null;
//       if (popup) {
//         popup.unbindPopup();
//       }
//     },
//     updateVisibleProp(value) {
//       /**
//        * Triggers when the visible prop needs to be updated
//        * @type {boolean}
//        * @property {boolean} value - value of the visible property
//        */
//       this.$emit('update:visible', value);
//     },
//   },
// };
