"use client"

import { type SearchCompanyFormInput, searchCompanyFormSchema } from "@/domain/company/companySearchSchema"
import { useChangeQueryParams } from "@/hooks/useChangeQueryParams"
import { Button, Checkbox, Flex, Group, Paper, Stack, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"

export const SearchCompanyForm = () => {
  const { overwriteQueryParams } = useChangeQueryParams("email")

  const form = useForm<SearchCompanyFormInput>({
    validate: zodResolver(searchCompanyFormSchema),
    initialValues: {
      name: "",
      email: "",
    },
  })

  /** 検索する */
  const searchCompany = async (input: SearchCompanyFormInput) => {
    try {
      overwriteQueryParams(input.email)
      notifications.show({ title: "Success！", message: "", color: "teal", icon: <IconCheck size="1.2rem" /> })
    } catch (error) {
      console.error({ error })
      notifications.show({ title: "Failed！", message: "", color: "pink", icon: <IconX size="1.2rem" /> })
    }
  }

  return (
    <>
      <Paper mb={60} p={40} bg="#E8E8E8" radius={0}>
        <form onSubmit={form.onSubmit(searchCompany)} noValidate>
          <Stack gap={24}>
            <Group>
              <TextInput maw={360} {...form.getInputProps("name")} label="企業名" />
              <TextInput maw={360} {...form.getInputProps("email")} label="企業メールアドレス" error={!!form.errors.email} />
            </Group>
            <Checkbox {...form.getInputProps("isIncludeCanceled")} label="未契約企業も含める" />
            <Flex gap="md" align="center">
              <Button variant="filled" type="submit" children="検索" />
              <Button variant="outline" type="submit" children="クリア" />
            </Flex>
          </Stack>
        </form>
      </Paper>
    </>
  )
}
