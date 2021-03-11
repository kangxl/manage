export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    icon: 'iconinput',
    prop: '',
    label: '',
    options: {
      width: '100%',
      defaultValue: '',
      showPassword: false,
      required: false,
      placeholder: '',
      minlength: null,
      maxlength: null
    }
  }, {
    type: 'textarea',
    name: '多行文本',
    icon: 'icontextarea',
    prop: '',
    label: '',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '',
      minlength: null,
      maxlength: null
    }
  }, {
    type: 'select',
    name: '下拉框',
    icon: 'iconxialakuang',
    prop: '',
    label: '',
    options: {
      defaultValue: '',
      required: false,
      optionList: [
        {
          value: '1',
          label: '标签1'
        }
      ]
    }
  }, {
    type: 'radio',
    name: '单选框',
    icon: 'icondanxuankuang',
    prop: '',
    label: '',
    options: {
      defaultValue: '',
      required: false,
      optionList: [
        {
          value: '1',
          label: '标签1'
        }
      ]
    }
  }, {
    type: 'checkbox',
    name: '多选框',
    icon: 'iconduoxuankuang1',
    prop: '',
    label: '',
    options: {
      showLabel: false,
      defaultValue: [],
      optionList: [
        {
          value: '1',
          label: '标签1'
        }
      ],
      required: false
    }
  }, {
    type: 'switch',
    name: '开关',
    icon: 'iconkaiguan',
    prop: '',
    label: '',
    options: {
      activeText: '',
      inactiveText: '',
      activeValue: true,
      inactiveValue: false,
      activeColor: '#409EFF',
      inactiveColor: '#C0CCDA'
    }
  }, {
    type: 'inputnumber',
    name: '计数器',
    icon: 'iconjishubiaoqian',
    prop: '',
    label: '',
    options: {
      width: '',
      min: '',
      max: '',
      precision: 0,
      placeholder: ''
    }
  }, {
    type: 'slider',
    name: '滑块',
    icon: 'iconhuakuai-',
    prop: '',
    label: '',
    options: {
      min: 0,
      max: 100,
      step: 1,
      showStops: false,
      range: false
    }
  }, {
    type: 'timepicker',
    name: '时间选择器',
    icon: 'iconshijianxuanzeqi',
    prop: '',
    label: '',
    options: {
      isRange: false,
      placeholder: '',
      endPlaceholder: '',
      startPlaceholder: ''
    }
  }, {
    type: 'datepicker',
    name: '日期选择器',
    icon: 'iconriqixuanze',
    prop: '',
    label: '',
    options: {
      type: 'date',
      isRange: false,
      placeholder: '',
      endPlaceholder: '',
      startPlaceholder: ''
    }
  }, {
    type: 'text',
    name: '文本',
    icon: 'iconwenzi',
    options: {
      text: '我是文本内容',
      size: '16',
      color: '#000000',
      position: 'left',
      background: '#FFFFFF'
    }
  }, {
    type: 'editor',
    name: '富文本',
    icon: 'iconfuwenbenkuang',
    prop: '',
    label: '',
    options: {
      width: '100%'
    }
  }
  //  {
  //   type: 'datetimepicker',
  //   name: '日期时间选择器',
  //   icon: 'iconriqishijian',
  //   options: {
  //     type: 'date',
  //     isRange: false,
  //     placeholder: '',
  //     endPlaceholder: '',
  //     startPlaceholder: ''
  //   }
  // }
]
export const layoutComponents = [
  {
    type: 'grid',
    icon: 'iconlayout',
    name: '横向布局',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  }
]
