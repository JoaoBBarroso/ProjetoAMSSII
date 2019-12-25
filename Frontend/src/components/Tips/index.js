import React from 'react';
import {
    Jumbotron, Container, Row, Col
} from 'reactstrap';


export default class Tips extends React.Component {
    render() {
        return (
            <Jumbotron className="justify-content-center">
                <Container>
                    <Row>
                        <Col xs="12">
                            <img src="https://assets.nhs.uk/prod/images/T_1117_healthy-eating_179013608.2e16d0ba.fill-920x613.jpg" alt="two hands holding fruits"></img>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" style={{ fontWeight: "bold" }}>
                            <h1>Here are 8 tips by the british National Health System for healthy eating</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" >
                            <p style={{ fontWeight: "bold" }}>These 8 practical tips cover the basics of healthy eating and can help you make healthier choices.</p>

                            <p>The key to a healthy diet is to eat the right amount of calories for how active you are so you balance the energy you consume with the energy you use.</p>
                            <p>If you eat or drink more than your body needs, you'll put on weight because the energy you do not use is stored as fat. If you eat and drink too little, you'll lose weight.</p>
                            <p>You should also eat a wide range of foods to make sure you're getting a balanced diet and your body is receiving all the nutrients it needs.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <h2>1. Base your meals on higher fibre starchy carbohydrates</h2>
                            <p>Starchy carbohydrates should make up just over a third of the food you eat. They include potatoes, bread, rice, pasta and cereals.</p>
                            <p>Choose higher fibre or wholegrain varieties, such as wholewheat pasta, brown rice or potatoes with their skins on.</p>
                            <p>They contain more fibre than white or refined starchy carbohydrates and can help you feel full for longer.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <h2>2. Eat lots of fruit and veg</h2>
                            <p>It's recommended that you eat at least 5 portions of a variety of fruit and veg every day. They can be fresh, frozen, canned, dried or juiced.</p>
                            <p>Getting your 5 A Day is easier than it sounds. Why not chop a banana over your breakfast cereal, or swap your usual mid-morning snack for a piece of fresh fruit?</p>
                            <p>A portion of fresh, canned or frozen fruit and vegetables is 80g. A portion of dried fruit (which should be kept to mealtimes) is 30g.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <h2>3. Eat more fish, including a portion of oily fish</h2>
                            <p>Fish is a good source of protein and contains many vitamins and minerals.</p>
                            <p>Aim to eat at least 2 portions of fish a week, including at least 1 portion of oily fish.</p>
                            <p>Oily fish are high in omega-3 fats, which may help prevent heart disease. </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <h2>4. Cut down on saturated fat and sugar</h2>
                            <p style={{ fontWeight: "bold" }}>Saturated fat</p>
                            <p>You need some fat in your diet, but it's important to pay attention to the amount and type of fat you're eating.</p>
                            <p>There are 2 main types of fat: saturated and unsaturated. Too much saturated fat can increase the amount of cholesterol in the blood, which increases your risk of developing heart disease.</p>
                            <p>On average, men should have no more than 30g of saturated fat a day. On average, women should have no more than 20g of saturated fat a day.</p>
                            <br />
                            <p style={{ fontWeight: "bold" }}>Sugar</p>
                            <p>Regularly consuming foods and drinks high in sugar increases your risk of obesity and tooth decay.</p>
                            <p>Sugary foods and drinks are often high in energy (measured in kilojoules or calories), and if consumed too often can contribute to weight gain. They can also cause tooth decay, especially if eaten between meals.</p>
                            <p>Free sugars are any sugars added to foods or drinks, or found naturally in honey, syrups and unsweetened fruit juices and smoothies.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <h2>5. Eat less salt: no more than 6g a day for adults</h2>
                            <p>Eating too much salt can raise your blood pressure. People with high blood pressure are more likely to develop heart disease or have a stroke.</p>
                            <p>Even if you do not add salt to your food, you may still be eating too much.</p>
                            <p>About three-quarters of the salt you eat is already in the food when you buy it, such as breakfast cereals, soups, breads and sauces.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <h2>6. Get active and be a healthy weight</h2>
                            <p>As well as eating healthily, regular exercise may help reduce your risk of getting serious health conditions. It's also important for your overall health and wellbeing.</p>
                            <p>Read more about the benefits of exercise and physical activity guidelines for adults.</p>
                            <p>Being overweight or obese can lead to health conditions, such as type 2 diabetes, certain cancers, heart disease and stroke. Being underweight could also affect your health.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <h2>7. Do not get thirsty</h2>
                            <p>You need to drink plenty of fluids to stop you getting dehydrated. The government recommends drinking 6 to 8 glasses every day. This is in addition to the fluid you get from the food you eat. </p>
                            <p>All non-alcoholic drinks count, but water, lower fat milk and lower sugar drinks, including tea and coffee, are healthier choices. </p>
                            <p>Try to avoid sugary soft and fizzy drinks, as they're high in calories. They're also bad for your teeth. </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <h2>8. Do not skip breakfast</h2>
                            <p>Some people skip breakfast because they think it'll help them lose weight.</p>
                            <p>But a healthy breakfast high in fibre and low in fat, sugar and salt can form part of a balanced diet, and can help you get the nutrients you need for good health.</p>
                            <p>A wholegrain lower sugar cereal with semi-skimmed milk and fruit sliced over the top is a tasty and healthier breakfast.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <p>For more information visit the <a href="https://www.nhs.uk/live-well/eat-well/eight-tips-for-healthy-eating/">NHS page</a></p>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        )
    }
}