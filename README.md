# Objetos Escondidos — 100 Fases

Projeto inicial jogável em React + Vite, preparado para empacotamento Android com Capacitor.

## O que já funciona
- Menu com 100 fases e desbloqueio progressivo.
- 10 temas de cenário que se repetem com variações ao longo das 100 fases.
- 10 a 15 itens-alvo por fase (a quantidade aumenta conforme a progressão).
- Toque nos objetos do cenário para encontrá-los, lista de itens e barra de progresso.
- 3 lupas por fase, com destaque visual de uma localização de objeto.
- Pontuação, conclusão da fase e salvamento local usando `localStorage`.
- Layout responsivo para celular.

## Executar no computador ou Replit
Requer Node.js 20 ou superior recomendado.

```bash
npm install
npm run dev
```

## Preparar para Android / gerar APK
1. Instale Node.js e Android Studio em um computador.
2. Na pasta do projeto execute:

```bash
npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

3. No Android Studio, aguarde a sincronização do Gradle. Para um APK de teste, use **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
4. Para atualizar depois de mudar o código, execute `npm run android:sync` e gere o APK novamente.

O projeto não inclui ainda a pasta nativa `android/` porque ela é criada pelo Capacitor no primeiro `npx cap add android`. A geração final de APK precisa do Android SDK/Gradle, normalmente via Android Studio ou CI.

## Observação importante
Esta é uma primeira versão jogável e expansível. Os mapas são ilustrações SVG geradas pelo próprio projeto, não imagens finais desenhadas à mão. O conteúdo, a lógica de fases e os objetos podem ser refinados em iterações futuras.

## Gerar APK pelo GitHub Actions

1. Envie o conteúdo desta pasta para a raiz do seu repositório GitHub (incluindo a pasta oculta `.github`).
2. Abra a aba **Actions** do repositório e habilite os workflows, se o GitHub solicitar.
3. Selecione **Gerar APK Android** e toque em **Run workflow**. Um envio para a branch `main` ou `master` também inicia a compilação.
4. Quando terminar com sucesso, abra a execução e baixe o artefato **objetos-escondidos-apk-debug**. Dentro dele estará `app-debug.apk`.

Este workflow gera um APK de depuração para testes, não um APK assinado para publicação na Play Store. O workflow cria a pasta Android durante a compilação; não é necessário enviar uma pasta `android` pronta.
