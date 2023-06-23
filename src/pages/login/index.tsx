import { supabase } from "@/apis/supabase"
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Image, VStack, Input, Button, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"

export const LoginPage = () => {

  const [form, setForm] = useState({ email: '', pass: '' })
  const [index, setIndex] = useState(0)
  const router = useRouter()
  const toast = useToast()

  const signup = async () => {

    if (!form.email || !form.pass) return toast({ status: 'warning', title: 'Erro', description: 'Preencha email e senha' })
    if (form.pass.length < 6) return toast({ status: 'warning', title: 'Erro', description: 'Use senha de pelo menos 6 caracteres' })

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.pass,
    })

    if (error) return toast({ status: 'error', title: 'Erro', description: 'Erro ao cadastrar' })

    if (data) {
      setIndex(0)
      return toast({ status: 'success', title: 'OK', description: 'Cadastro Realizado' })
    }
  }

  const signin = async () => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.pass,
    })

    if (error?.message === 'Email not confirmed') return toast({ 
      status: 'error', title: 'Erro', description: 'Email não confirmado' 
    })

    if (error?.message === 'Invalid login credentials') return toast({ 
      status: 'error', title: 'Erro', description: 'Email ou senha incorretos' 
    })

    if (error) return toast({ 
      status: 'error', title: 'Erro', description: 'Erro ao entrar' 
    })

    if (data) {
      console.log(JSON.stringify(data))

      await supabase.from('profiles').insert({
        id: data.user?.id,
        first_name: form.email.substring(0, 10)
      })
      
      localStorage.setItem('access_token', data.session?.access_token || '')
      router.push('/')
      return toast({ status: 'success', title: 'OK', description: 'Login Realizado' })
    }
  }

  return (
    <Box maxW="xl" m="0 auto" display="flex" alignItems="center" flexDir="column">
      <Image src="/images/logo-vertical.svg" h={200} />
      <Tabs variant='soft-rounded' colorScheme='green' w="100%" index={index} onChange={e => setIndex(e)}>
        <TabList>
          <Tab>Entrar</Tab>
          <Tab>Cadastrar</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Input placeholder="Email" my="2" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Senha" my="2" value={form.pass} onChange={e => setForm({ ...form, pass: e.target.value })} type="password" />
            <Button variant="solid" colorScheme="blue" my="2" onClick={signin}>Entrar</Button>
          </TabPanel>
          <TabPanel>
            <Input placeholder="Email" my="2" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Senha" my="2" value={form.pass} onChange={e => setForm({ ...form, pass: e.target.value })} type="password" />
            <Button variant="solid" colorScheme="blue" my="2" onClick={signup}>Cadastrar</Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
