📝 Resumo: HTML Semântico e "Div Soup"
"Div Soup" (Sopa de Divs): Termo usado para descrever o uso excessivo e desnecessário de tags <div> para envolver quase todos os elementos em um projeto.

Problema: Esse excesso de divs torna o código menos legível para humanos e máquinas, além de reduzir a semântica (significado) e prejudicar a acessibilidade do projeto.

Melhor Prática: Priorize o uso de tags HTML semânticas (<header>, <main>, <form>, <section>, <article>, <footer>) sempre que possível.

Flexbox/Grid: Com o CSS moderno, podemos estilizar e posicionar as tags semânticas diretamente. Isso elimina a necessidade de wrappers <div> para a maioria dos layouts.

Regra de Ouro: Use a <div> apenas quando não houver uma tag semântica mais apropriada e você precisar de um container genérico para fins de agrupamento ou controle de layout (ex: o pai de um Flexbox).

---

📏 px vs. rem em Border-Radius
Essa é uma pergunta excelente e muito relevante para a prática.

O motivo principal é a distinção entre unidades relativas e absolutas no contexto de elementos não-textuais:

O que é REM?
Relativo: O rem é relativo ao tamanho da fonte do elemento raiz (<html>). Se o seu <html> tem font-size: 16px (padrão do navegador), 1rem é 16px. Se o usuário aumentar o tamanho da fonte padrão nas configurações de acessibilidade do navegador, o rem escala junto.

Por que PX é usado?
Consistência Visual: O border-radius define o formato visual de um canto. Ao usar px, você garante que o canto arredondado tenha o tamanho exato de 8 pixels, independentemente de o usuário ter aumentado o zoom do texto ou o tamanho da fonte padrão.

Estrutura vs. Conteúdo: Muitos desenvolvedores preferem usar px para elementos de estrutura visual (como bordas, sombras e, às vezes, larguras e alturas fixas) e rem para elementos de conteúdo e espaçamento (font-size, padding, margin). Isso permite que o texto seja acessível e escalável, mas mantém a estrutura básica do layout rígida e consistente.

Em resumo, usar px em border-radius garante que o arredondamento de 8 pixels seja sempre 8 pixels, mantendo a fidelidade exata ao design.
