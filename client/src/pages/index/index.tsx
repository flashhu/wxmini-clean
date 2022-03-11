import { FC } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { useShareAppMessage } from '@tarojs/taro';
import { INTRO_MAIN_1, INTRO_MAIN_2, INTRO_1, INTRO_2, INTRO_3, INTRO_4, LOGO } from '@/constant/img';
import './index.less'

const Index: FC = () => {
  useShareAppMessage(res => ({
      title: '艾尔森净化',
      imageUrl: LOGO,
      path: '/pages/order/index'
  }))

  return (
    <View className='g-intro'>
      <View className="m-logo">
        <Image src={INTRO_MAIN_1}></Image>
      </View>
      <View className='m-sect'>
        <View className="m-title">
          <Text className="m-txt">艾尔森简介</Text>
          <View className="m-tle">
            <Text className="m-l">SINCE</Text>
            <Text className="m-r">2016</Text>
          </View>
          <View className="m-tlc">用呼吸，传递爱！</View>
        </View>
        <View className="m-intro">
          <Text className="m-p">浙江艾尔森环保科技有限公司由中科院博士生团队支持创办，主要致力于家政保洁清除空气净化治理、室内空气检测等销售服务。</Text>
          <Text className="m-p">公司拥有多项自主知识产权空气净化产品，系浙江省室内环境净化行业协会会长单位、室内环境污染治理甲级资质单位、G20杭州峰会空气净化服务商、国家级二青会室内环境治理技术委员单位、浙江省科技型企业、2020被评为“突出贡献单位”，已通过“ISO9001”管理体系认证。</Text>
          <Text className="m-p">2019年艾尔森携手世界500强企业霍尼韦尔在杭州成立浙江营销中心，共享核心技术。2020年初，新冠肺炎疫情期间累计向杭城捐赠百吨消毒物资，为杭城各区多所中小学校进行了公益消毒灭菌服务，受到了各区教育局的嘉奖及表扬。我们重新定义美好生活，致力于给用户提供健康环保的产品，改善空气环境、提高生活质量，用呼吸、传递爱！</Text>
        </View>
      </View>
      <View className="m-logo m-logo2">
        <Image src={INTRO_MAIN_2}></Image>
      </View>
      <View className='m-sect'>
        <View className="m-title">
          <Text className="m-txt">品牌由来</Text>
          <View className="m-tle">
            <Text className="m-l">BRAND ORIGIN</Text>
          </View>
        </View>
        <View className="m-intro">
          <Text className="m-p">浙江艾尔森研发团队早在2015年就致力于空气净化领域的研究探索，经过不断的测试改良，在2016年7月首次推出含酶空气净化网，通过溶菌酶破坏细菌、病毒、微生物的细胞结构，达到杀菌净化，可以与中央空调的完美结合，便用采用集中处理方式净化室内空气。这种全方位、高效率、全领域的空气净化技术，被业内及媒体广泛关注报道。</Text>
          <Text className="m-p">艾尔森成立初心就抱着为中国生态环境健康、改善人们工作家庭环境贡献绵薄之力，形成人人重视环保、人人参与环保的社会氛围，共建美丽中国。所以公司LOGO主体为字母FSAR是Fresh Air(新鲜空气)的缩写, 中心的叶子寓意空气净化，契合产品的行业特色; 整体采用圆形如太极图，象征着企业永续发展，不断壮大、福泽社会的愿景</Text>
        </View>
      </View>
      <View className="m-sect">
        <View className="m-title">
          <Text className="m-txt">企业文化</Text>
          <View className="m-tle">
            <Text className="m-l">CORPORATE CULTURE</Text>
          </View>
        </View>
        <View className="m-wh">
          <View className="m-item">
            <Text className="m-head">服务理念</Text>
            <Text className="m-tail">客户至上 诚信守约 关爱生命</Text>
          </View>
          <View className="m-item">
            <Text className="m-head">企业使命</Text>
            <Text className="m-tail">
              <Text>改善空气环境</Text>
              <Text>缔造健康生活</Text>
            </Text>
          </View>
          <View className="m-item">
            <Text className="m-head">企业口号</Text>
            <Text className="m-tail">用呼吸传递爱</Text>
          </View>
        </View>
      </View>
      <View className="m-footer">
        <View className="m-mark">
          <Image src={INTRO_1}></Image>
          <Text className="m-t">浙江省科技型企业</Text>
          <Text className="m-c">国际一流的博士研发团队</Text>
        </View>
        <View className="m-mark">
          <Image src={INTRO_2}></Image>
          <Text className="m-t">G20杭州峰会空净服务商</Text>
          <Text className="m-c">官方认证实力</Text>
        </View>
        <View className="m-mark">
          <Image src={INTRO_3}></Image>
          <Text className="m-t">省净化行业协会会长单位</Text>
          <Text className="m-c">国际一流的博士研发团队</Text>
        </View>
        <View className="m-mark">
          <Image src={INTRO_4}></Image>
          <Text className="m-t">双甲级资质</Text>
          <Text className="m-c">实力看的见</Text>
        </View>
      </View>
    </View>
  )
}

export default Index;