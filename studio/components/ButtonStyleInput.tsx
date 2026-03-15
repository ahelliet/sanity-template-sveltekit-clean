import {useCallback} from 'react'
import {set, unset, useFormValue, type StringInputProps} from 'sanity'
import {Select, Stack, Card} from '@sanity/ui'

// Dark theme colors mapped from shadcn-svelte tailwind config (oklch converted to hex)
const styles = [
  {
    value: 'link',
    label: 'Lien texte',
    css: {color: '#e2e8f0', textDecoration: 'underline', textUnderlineOffset: '4px', background: 'transparent', border: 'none'},
  },
  {
    value: 'default',
    label: 'Default',
    css: {background: '#e8e8ec', color: '#131316', border: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.3)'},
  },
  {
    value: 'secondary',
    label: 'Secondary',
    css: {background: '#2a2a35', color: '#f8f8fa', border: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.3)'},
  },
  {
    value: 'outline',
    label: 'Outline',
    css: {background: 'transparent', color: '#f8f8fa', border: '1px solid #3a3a45', boxShadow: '0 1px 2px rgba(0,0,0,0.3)'},
  },
  {
    value: 'ghost',
    label: 'Ghost',
    css: {background: 'transparent', color: '#f8f8fa', border: 'none'},
  },
  {
    value: 'destructive',
    label: 'Destructive',
    css: {background: '#c43a3a', color: '#ffffff', border: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.3)'},
  },
]

export function ButtonStyleInput(props: StringInputProps) {
  const {value, onChange, path} = props
  const parentPath = path.slice(0, -1)
  const label = useFormValue([...parentPath, 'label']) as string | undefined

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.currentTarget.value
      onChange(val ? set(val) : unset())
    },
    [onChange],
  )

  const current = styles.find((s) => s.value === value) || styles[0]

  return (
    <Stack space={3}>
      <Select value={value || ''} onChange={handleChange}>
        {styles.map((style) => (
          <option key={style.value} value={style.value}>
            {style.label}
          </option>
        ))}
      </Select>
      <Card padding={3} radius={2} shadow={1} style={{background: '#131316'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span style={{fontSize: '12px', color: '#888'}}>Aperçu :</span>
          <div
            style={{
              padding: current.value === 'link' ? '0' : '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              ...current.css,
            }}
          >
            {label || current.label}
          </div>
        </div>
      </Card>
    </Stack>
  )
}
