import React from 'react';

// Componente da página Nossa História
const NossaHistoriaPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800 dark:text-blue-300">Nossa História</h1>

      {/* Seção: A História da Igreja Unida de Inácio Monteiro */}
      <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">A Fundação da Igreja</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          No ano de 1985, era inaugurada a COHAB Juscelino, como parte do maior complexo de conjuntos habitacionais populares da América do sul, tendo sido construído no início da década de 80, pela Prefeitura do Município de São Paulo, denominado Cidade Tiradentes, situado no extremo leste da capital paulista, construído para se bairro dormitório.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Milhares de pessoas, vindas das mais diversas partes da cidade, estavam finalmente realizando o sonho da casa própria. Ali se formava também um cenário propício para a propagação do evangelho.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Muitas pessoas salvas por Jesus e ávidas pela Palavra, não tinham lugar próprio para culto, por isso, a <strong>1ª Igreja Unida de Guaianazes</strong>, a nossa Sede Regional, inaugurou, em <strong>02/08/1988</strong>, um ponto de pregação no lar da irmã <strong>Emília Alexandre de Paula</strong>, que, mais tarde, tornou-se pastora da igreja.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          À medida que o número de membros crescia, os irmãos começaram a procurar locais mais adequados para cultuar ao Senhor, até que adquiriram o imóvel no recém inaugurado Conjunto Habitacional Inácio Monteiro, situado na <strong>Rua Cachoeira Jaciquara, 175</strong>. A Inauguração do templo ocorreu em 22/01/1994, onde se encontra instalado até os dias de hoje, para a glória de Deus.
        </p>

        <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Pastores que Fizeram História</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-600">
                <th className="py-2 px-4 border-b dark:border-gray-500 text-left text-gray-700 dark:text-gray-200">Pastores</th>
                <th className="py-2 px-4 border-b dark:border-gray-500 text-left text-gray-700 dark:text-gray-200">Entrada</th>
                <th className="py-2 px-4 border-b dark:border-gray-500 text-left text-gray-700 dark:text-gray-200">Saída</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">José Florêncio</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">02/08/1988</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">24/08/1992</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">Altamiro</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">25/08/1992</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">21/01/1994</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">Isaías e Edmilson</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">22/01/1994</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">13/01/1998</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">Emília Alexandre</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">14/01/1998</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">07/12/2013</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">Sérgio Lapa</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">08/12/2013</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">13/09/2015</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">Marcelo Davila</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">14/09/2015</td>
                <td className="py-2 px-4 border-b dark:border-gray-500 text-gray-700 dark:text-gray-300">31/12/2024</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-2 px-4 text-gray-700 dark:text-gray-300">João Alexandre</td>
                <td className="py-2 px-4 text-gray-700 dark:text-gray-300">01/01/2025</td>
                <td className="py-2 px-4 text-gray-700 dark:text-gray-300">Atual</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Seção: Missão, Visão e Valores */}
      <section className="mb-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">Missão, Visão e Valores</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-400">Missão</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ir, pregar e fazer discípulos na sua localidade (Marcos 16:15, Mateus 20:28)
            </p>
            <h3 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-400">Visão</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ser uma igreja envolvente para as pessoas a que fomos vocacionados para alcançar
            </p>
            <h3 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-400">Valores</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>Fruto do Espírito (Gálatas 5:22,23)</li>
              <li>Cidadão do céu (Salmos 15:2-5)</li>
              <li>Unidade (João 17:21)</li>
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              <em>Estabelecida na Oficina de Líderes em 08/01/2022.</em><br />
              <em>Bibliografia: Livro: Liderança Corajosa, Bill Hybels, Pastor Presidente da Willow Creek Community Church, Editora Vida, Edição 2002, São Paulo.</em>
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="/assets/images/missao_visao_valores.jpeg" 
              alt="Quadro com Missão, Visão e Valores da Igreja" 
              className="rounded-lg shadow-lg max-w-full h-auto border-4 border-white dark:border-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Seção: Cremos */}
      <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Em que Cremos</h2>
        <ol className="list-alpha list-inside space-y-3 text-gray-700 dark:text-gray-300">
          <li>Em Deus, criador e sustentador de todas as coisas, imanente no Universo e do mesmo transcendente, e Criador de todos os homens, fonte de vida, de toda beleza e bondade, de toda verdade e amor.</li>
          <li>Em Jesus Cristo, Deus manifesto na carne, nosso guia e exemplo de santidade, humildade e amor, redentor e salvador do mundo.</li>
          <li>No Espírito Santo, Deus presente conosco, consolador, providenciando direção, conforto e força para a nossa vida, e que é, na realidade, o selo para a redenção.</li>
          <li>Que há três pessoas na divindade: o Pai, o Filho e o Espírito Santo, indivisíveis em sua essência, iguais em poder e glória.</li>
          <li>Que na pessoa de nosso Senhor Jesus Cristo acham-se unidas a natureza humana e a divina, de modo que ele é verdadeiro Deus e verdadeiro homem.</li>
          <li>Que nossos primeiros pais foram criados em estados de inocência; e por sua desobediência, porém, perderam sua pureza e felicidade e, em consequência de sua queda, todos homens se tornaram pecadores, expostos justamente à ira de Deus;</li>
          <li>Que o Senhor Jesus Cristo tem feito, pelo seu sofrimento e morte, expiação pelos pecados de todo mundo, de sorte que todo aquele que crer na suficiência da obra expiatória de Jesus pode ser salvo;</li>
          <li>No perdão dos pecados, na vida de amor e oração e na graça suficiente para todas as nossas necessidades;</li>
          <li>Na Bíblia Sagrada, como sendo inspirada por Deus, sendo, portanto, infalível e inerrante, tendo-a como regra de fé e prática;</li>
          <li>Que o arrependimento para com Deus, a fé em nosso Senhor Jesus Cristo e a regeneração pelo Espírito Santo, são necessários à salvação dos homens;</li>
          <li>Na imortalidade da alma; na ressurreição do corpo; no juízo final; na felicidade eterna dos justos e na punição eterna dos injustos;</li>
          <li>Que o batismo nas águas é um símbolo de nossa morte para o mundo e novo nascimento em Cristo Jesus, e deve ser ministrado aos que se convertem;</li>
          <li>Na Ceia do Senhor, como comemoração da morte de nosso Senhor Jesus Cristo, devendo todos os cristãos participar dela;</li>
          <li>Na Igreja, como sendo a comunidade de todos os verdadeiros crentes sob o senhorio de Jesus Cristo;</li>
          <li>No batismo com o Espírito Santo, como sendo uma experiência subsequente à salvação, com a evidência bíblica do falar em novas línguas;</li>
          <li>Nos dons do Espírito Santo, que são dados aos homens para edificação da Igreja;</li>
          <li>Na cura divina, como sendo uma das promessas de Deus para aqueles que creem;</li>
          <li>Na segunda vinda de nosso Senhor Jesus Cristo, sendo a primeira fase o arrebatamento da Igreja e a segunda fase, visível aos homens;</li>
          <li>No milênio, como sendo o período de mil anos em que Jesus Cristo reinará sobre a terra, juntamente com os seus santos.</li>
        </ol>
      </section>

      {/* Seção: Nossa Área de Atuação */}
      <section className="mb-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Nossa Área de Atuação</h2>
        <h4 className="text-xl font-medium mb-3 text-gray-700 dark:text-gray-300">Nossa posição geográfica no mapa da capital paulista:</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          O Distrito de Cidade Tiradentes abriga o maior complexo de conjuntos habitacionais da América Latina, com cerca de 40 mil unidades, a maioria delas, construídas na década de 1980 pela COHAB (Companhia Metropolitana de Habitação de São Paulo), CDHU (Companhia de Desenvolvimento Habitacional e Urbano do Estado de São Paulo) e por grandes empreiteiras, que inclusive aproveitaram o último financiamento importante do BNH (Banco Nacional da Habitação), antes de seu fechamento.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          O bairro foi planejado como um grande conjunto periférico e monofuncional do tipo “bairro dormitório” para deslocamento de populações atingidas pelas obras públicas, assim como ocorreu com a Cidade de Deus, no Rio de Janeiro.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          No final da década de 1970, o poder público iniciou o processo de aquisição de uma gleba de terras situada na região, que era conhecida como Fazenda Santa Etelvina, então formada por eucaliptos e trechos da Mata Atlântica. Prédios residenciais começaram a ser construídos, modificando a paisagem e local começou a ser habitado por enormes contingentes de famílias, que aguardavam na “fila” da casa própria de Companhias habitacionais.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Além da vastidão de conjuntos habitacionais, que compõem a chamada “Cidade Formal”, existe também a “Cidade Informal”, formada por favelas e pelos loteamentos habitacionais clandestinos e irregulares, instalados em áreas privadas.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          A Cidade Tiradentes possui, portanto, uma população de 211.501 mil habitantes (censo 2010) num único distrito. A alta concentração populacional - 14.100 hab./Km2 – é acrescida de uma das maiores taxas de crescimento da cidade e de graves problemas sociais. Esta população contabiliza um total de 52.875 famílias residentes no território abrangido pela respectiva Prefeitura Regional. Deste total, 8.064 famílias encontram-se em situação de alta ou muito alta vulnerabilidade.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          As áreas ocupadas pela população da “Cidade Informal” são lacunas deixadas na construção dos prédios da COHAB; ocupações nas bordas dos conjuntos, e também de expansão da mancha urbana.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          A identidade dos moradores de Cidade Tiradentes está diretamente ligada ao processo de constituição do bairro, feita sem um planejamento pré-estabelecido, que levasse em conta as necessidades básicas da população.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Muitas pessoas vieram para a Cidade Tiradentes em busca da realização do sonho da casa própria, embora boa parte tenha se deslocado a contragosto, na ausência de uma outra opção de moradia. O fato de não terem encontrado no local uma infraestrutura adequada ás suas necessidades e da região oferecer escassas oportunidades de trabalho, fez com que passassem a ter Cidade Tiradentes, como bairro dormitório e de passagem e não de destino.
        </p>
        <h4 className="text-xl font-medium mt-6 mb-2 text-gray-700 dark:text-gray-300">Principais Vias:</h4>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
          <li>Estrada do Iguatemi</li>
          <li>Av. Inácio Monteiro</li>
          <li>Av. dos Metalúrgicos</li>
          <li>Av. dos Têxteis</li>
          <li>Av Sara kubitscheck</li>
        </ul>
        <h4 className="text-xl font-medium mt-6 mb-2 text-gray-700 dark:text-gray-300">Bairros de Cidade Tiradentes:</h4>
        <p className="text-gray-700 dark:text-gray-300">
          Fazenda do Carmo, Vila Hortência, Prestes Maia, Inácio Monteiro, Vilma Flor, Sítio Paiolzinho, Vila Yolanda, Dom Angélico, Sítio Conceição, Castro Alves, Vila Paulista, Santa Etelvina II B, Jardim Souza Ramos, Jardim Maravilha, Barro Branco, Jd. Pérola, Jd. Vitória, Jd. 3 Poderes, Santa Etelvina I A, Santa Etelvina VII A (Setor G), Santa Etelvina II A, Santa Etelvina III A, Santa Etelvina IV, Morro Disso, Gráficos.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          <em>Fonte: Prefeitura Municipal de São Paulo (link omitido).</em>
        </p>
      </section>

      {/* Seção: Nossa Sede Regional */}
      <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Nossa Sede Regional</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Somos subordinados diretamente à nossa Sede Regional, em Guaianases.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          No ano de 1965, o Pastor Eurico de Almeida Vieira, juntamente com sua esposa Missionária Mariquinha Vieira, membros da Convenção da Igreja Unida, promoveram os primeiros cultos num pequeno salão localizado na Rua Comandante Carlos Rulh, na Vila Solange, Guaianases, sendo certo, que após algum tempo, o Pastor Ildo Batista assumiu o pastorado daquela congregação.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Como o local já não mais comportava as pessoas que para lá fluíam, em decorrência das muitas conversões ao Evangelho de Jesus Cristo, o Pastor Benedito Pinto de Souza, que pastoreava a congregação na época, juntamente com outros irmãos, adquiriram um terreno na Rua Tapuraíba, no Parque Central, em Guaianases, onde construíram, e em 1972 inauguraram oficialmente a nossa igreja.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Em 1974, o Pastor Joaquim Alves de Almeida assumiu o pastorado da igreja, e, com muito trabalho e dedicação, apoiado por outros pastores de igual altruísmo, fundou outras congregações, tornando-se o primeiro Presidente Regional.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          No dia 28 de novembro de 2004, o Pastor Joaquim Alves de Almeida manifestou seu interesse em deixar a Presidência Regional, ocasião em que o <strong>Pastor João Machado de Sousa</strong> assumiu a direção da <strong>1ª Igreja Unida de Guaianases</strong>, sendo o atual Presidente Regional.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Igrejas que Compõem o Campo:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Igreja Regional */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida de Guaianases (Regional)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastor Ricardo Ferreira e Viviane</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rua Tapuraíba, 1, Guaianases, São Paulo, SP.</p>
          </div>
          {/* Outras Igrejas (Brasil) */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida de Calmon Viana</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastores Elenice Andrade e Edson Gonzaga</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">R. Padre Eustáquio, 1644, Calmon Viana, Poá, SP.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida de Cidade Tiradentes</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastores José Francisco e Silvânia Gonzaga</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rua dos Cunhas, 5, Cidade Tiradentes, São Paulo, SP.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida de Inácio Monteiro</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastor João Alexandre</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rua Cachoeira de Jaciquara, nº 175, Conjunto Inácio Monteiro, São Paulo, SP.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida de Jardim Áurea</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastora Neth Leal e Manoel Nascimento</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rua Henrique Adamus, 3, Guaianases, São Paulo, SP.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida de Poá</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastor Ramon Gabriel e Sirlene Cintra</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rua Presidente Vargas, 6, Vila Monteiro, Poá, SP.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida de Jardim Maia</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastor Dênis Silva e Katleen Silva</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avenida Professor Alípio de Barros, 600, São Miguel Paulista, São Paulo, SP.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida de Vila Iolanda</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastores Cleusa e Mauro Brentan</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rua Gaspar Dias de Ataíde, nº 8, Lageado, São Paulo, SP.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida de Vila Princesa Isabel</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastores Railton Rodrigues e Neusa de Souza</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rua Evaldo Calabrez, 581 - Vila Princesa Isabel, São Paulo - SP.</p>
          </div>
          {/* Igrejas (Nigéria) */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida De Aukpa Adoka (Nigéria)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Evangelist Samuel Owoicho, Missionários Andrew Ajayi e Agbada Ogbeide</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Opposite Methodist Church, Otukpo Local Government, Benue State, Nigéria</p>
          </div>
           <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida De Abuja (Nigéria)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastor Dr. Daniel Echehoyi, Missionários Andrew Ajayi e Agbada Ogbeide</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Jukwoyi Phase 2, Abuja, Federal Capital Territory, Nigéria</p>
          </div>
           <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida De Benin City (Nigeria)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastor Precious Iditua, Missionários Andrew Ajayi e Agbada Ogbeide</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Street Aiworo, 4, Off Upper Erhunmwunse, Benin, Nigéria</p>
          </div>
           <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida De Jos (Nigéria)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastor Kim Linus, Missionários Andrew Ajayi e Agbada Ogbeide</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Airport Road Junction, Secretariate, Jos, Plateu State, Nigéria</p>
          </div>
           <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida De Lagos (Nigéria)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastor John Acheme, Missionários Andrew Ajayi e Agbada Ogbeide</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Street Osuolale Adelodun, 29, Off Badagry Expressway, Lagos, Nigéria</p>
          </div>
           <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida De Onyagede (Nigéria)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastor Samuel Ochela, Missionários Andrew Ajayi e Agbada Ogbeide</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Opposite Onyagede Primary School, Ohimin Local Government, Benue State, Nigéria</p>
          </div>
           <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">1ª Igreja Unida De Otukpa (Nigéria)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pastor Christian E. Okoh, Missionários Andrew Ajayi e Agbada Ogbeide</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Otukpa Town Hall, Ogbadigbo Local Government, Benue State, Nigéria</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default NossaHistoriaPage;

// Estilo CSS para a lista alfabética (pode ser adicionado ao index.css ou App.css)
/* 
.list-alpha {
  list-style-type: lower-alpha;
}
*/

