async function onMessage(ctx, event) {
  if (event.message_type !== 'group') return

  const groupId = String(event.group_id)
  const msg = event.raw_message?.trim() || ''

  if (msg !== '哈基米') return

  try {
    const res = await fetch('http://api.ocoa.cn/api/hjm.php')
    const data = await res.json()
    if (!data || !data.url) return

    await ctx.actions.call(
      'send_group_msg',
      {
        group_id: groupId,
        message: [
          {
            type: 'record',
            data: {
              file: data.url
            }
          }
        ]
      },
      ctx.adapterName,
      ctx.pluginManager.config
    )
  } catch (e) {}
}

async function plugin_init(ctx) {
  ctx.logger.info('哈基米语音插件加载完成')
}

async function plugin_get_config() {
  return {}
}

function plugin_on_config_change() {}

const plugin_onmessage = onMessage

export {
  plugin_init,
  plugin_get_config,
  plugin_on_config_change,
  plugin_onmessage
}