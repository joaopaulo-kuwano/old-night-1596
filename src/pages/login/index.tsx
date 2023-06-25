import { supabase } from "@/apis/supabase"
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Image, Input, Button, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"

export const LoginPage = () => {

  const [form, setForm] = useState({
    email: '',
    pass: '',
    sign_email: '',
    sign_pass: '',
    first_name: '',
    last_name: '',
    user_name: '',
  })

  const [index, setIndex] = useState(0)
  const router = useRouter()
  const toast = useToast()

  const signup = async () => {

    if (!form.sign_email || !form.sign_pass || !form.first_name || !form.user_name) return toast({
      status: 'warning', title: 'Erro', description: 'Preencha email e senha'
    })

    if (form.sign_pass.length < 6) return toast({
      status: 'warning', title: 'Erro', description: 'Informe uma senha de pelo menos 6 caracteres'
    })

    const { data, error } = await supabase.auth.signUp({
      email: form.sign_email,
      password: form.sign_pass,
    })

    if (error) return toast({
      status: 'error', title: 'Erro', description: 'Erro ao cadastrar'
    })

    if (data) {

      await supabase.from('profiles').insert({
        id: data.user?.id,
        first_name: form.first_name,
        last_name: form.last_name,
        user_name: form.user_name,
      })

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

    if (error || !data) return toast({
      status: 'error', title: 'Erro', description: 'Erro ao entrar'
    })

    const profileApi = await supabase.from('profiles').select()
    if (!profileApi.data) return  toast({ 
      status: 'error', title: 'Erro', description: 'Erro ao buscar perfil' 
    })

    const profileList = profileApi.data.filter(e => e.id === data.session?.user.id)
    if (!profileList.length) return  toast({ 
      status: 'error', title: 'Erro', description: 'Erro ao buscar perfil' 
    })

    const profile = profileList[0]
    console.log(profile)

    
    localStorage.setItem('access_token', data.session?.access_token || '')
    router.push('/')
    return toast({status: 'success', title: 'OK', description: 'Login efetuado'})
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
            <Input
              placeholder="Email"
              my="2"
              value={form.sign_email}
              onChange={e => setForm({ ...form, sign_email: e.target.value })}
            />
            <Input
              placeholder="Senha"
              my="2"
              value={form.sign_pass}
              onChange={e => setForm({ ...form, sign_pass: e.target.value })}
              type="password"
            />
            <Input
              placeholder="Nome"
              my="2"
              value={form.first_name}
              onChange={e => setForm({ ...form, first_name: e.target.value })}
            />
            <Input
              placeholder="Sobrenome"
              my="2"
              value={form.last_name}
              onChange={e => setForm({ ...form, last_name: e.target.value })}
            />
            <Input
              placeholder="Nickname"
              my="2"
              value={form.user_name}
              onChange={e => setForm({ ...form, user_name: e.target.value })}
            />
            <Button variant="solid" colorScheme="blue" my="2" onClick={signup}>Cadastrar</Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
